// src/pages/HomePage.jsx
import { useEffect, useState } from "react"
import { Header, Footer, MealsharePagination } from "../components"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { EventCard } from "@/components/EventCard"
import { fetchMealEvents, joinMealEvent, fetchDiningHalls, getUserEvents } from "@/api/api"
import { Calendar, Slider } from 'antd';
import dayjs from 'dayjs';
import eat_together from '../assets/eat_together.png'

const ITEMS_PER_PAGE = 5;

export function HomePage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [diningHalls, setDiningHalls] = useState([]);
    const [selectedHalls, setSelectedHalls] = useState(new Set());
    const [sortOrder, setSortOrder] = useState('newest');
    const [currentPage, setCurrentPage] = useState(1);
    const [userEvents, setUserEvents] = useState(new Set());
    const userId = 1;
    const [groupSizeRange, setGroupSizeRange] = useState([1, 10]);
    const [dateRange, setDateRange] = useState([null, null]);
    const [timeRange, setTimeRange] = useState([0, 24]);
    const [isSelectingEndDate, setIsSelectingEndDate] = useState(false);
    const [eatTogether, setEatTogether] = useState(true);

    useEffect(() => {
        async function loadInitialData() {
            try {
                setLoading(true);
                const [eventsData, hallsData, userEventsData] = await Promise.all([
                    fetchMealEvents(),
                    fetchDiningHalls(),
                    getUserEvents(userId)
                ]);
                
                const userEventIds = new Set(userEventsData.map(event => event.id));
                
                setEvents(eventsData);
                setDiningHalls(hallsData);
                setUserEvents(userEventIds);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        }
        loadInitialData();
    }, []);

    async function handleJoin(eventId) {
        try {
            await joinMealEvent(eventId, userId);
            setEvents(events => events.map(ev => {
                if (ev.id === eventId) {
                    return {...ev, spots_taken: ev.spots_taken + 1}
                }
                return ev;
            }));
            setUserEvents(prev => new Set([...prev, eventId]));
        } catch (e) {
            console.error(e);
            alert("Failed to join event: " + e.message);
        }
    }

    const handleHallToggle = (hallId) => {
        setSelectedHalls(prev => {
            const newSet = new Set(prev);
            if (newSet.has(hallId)) {
                newSet.delete(hallId);
            } else {
                newSet.add(hallId);
            }
            return newSet;
        });
        setCurrentPage(1); // Reset to first page when filtering
    };

    const handleSort = (order) => {
        setSortOrder(order);
        setEvents(prev => [...prev].sort((a, b) => {
            const dateA = new Date(a.event_time);
            const dateB = new Date(b.event_time);
            return order === 'newest' ? dateB - dateA : dateA - dateB;
        }));
        setCurrentPage(1); // Reset to first page when sorting
    };

    const handleDateSelect = (date) => {
        if (!isSelectingEndDate) {
            setDateRange([date, null]);
            setIsSelectingEndDate(true);
        } else {
            if (date < dateRange[0]) {
                setDateRange([date, dateRange[0]]);
            } else {
                setDateRange([dateRange[0], date]);
            }
            setIsSelectingEndDate(false);
        }
    };

    const handleEatTogether = (checked) => {
        setEatTogether(!checked)
        setCurrentPage(1)
    }

    const filteredEvents = events.filter(event => {
        const hallFilter = selectedHalls.size === 0 || selectedHalls.has(event.dining_hall.id);
        
        const spotsTotalFilter = event.spots_total >= groupSizeRange[0] && 
                               event.spots_total <= groupSizeRange[1];
        
        const eventDate = dayjs(event.event_time);
        const dateFilter = !dateRange[0] || !dateRange[1] || (
            eventDate.isAfter(dateRange[0].startOf('day')) && 
            eventDate.isBefore(dateRange[1].endOf('day'))
        );
        
        const eventHour = eventDate.hour();
        const timeFilter = eventHour >= timeRange[0] && eventHour <= timeRange[1];

        const togetherFilter = event.eat_together === eatTogether
        
        return hallFilter && spotsTotalFilter && dateFilter && timeFilter && togetherFilter;
    });

    const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
    const paginatedEvents = filteredEvents.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const headerRender = ({ value, onChange }) => {
        const current = value.clone();
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        return (
            <div className="flex justify-between items-center px-2 py-1">
                <button 
                    onClick={() => onChange(current.clone().subtract(1, 'month'))}
                    className="text-gray-600 hover:text-gray-900"
                >
                    ←
                </button>
                <span className="text-sm font-medium">
                    {months[current.month()]} {current.year()}
                </span>
                <button 
                    onClick={() => onChange(current.clone().add(1, 'month'))}
                    className="text-gray-600 hover:text-gray-900"
                >
                    →
                </button>
            </div>
        );
    };

    return (
        <>
            <Header/>
            <Separator/>
            <div className="flex gap-10 mx-10 my-10">
                <div className="w-[280px] flex-shrink-0">
                    <div className="flex flex-col border border-slate-300 px-2 py-2 sticky top-4">
                        <div className="text-2xl pb-4">Dining Halls</div>
                        {diningHalls.map(hall => (
                            <div key={hall.id} className='flex items-center space-x-2 my-1'>
                                <Checkbox 
                                    id={`hall-${hall.id}`}
                                    checked={selectedHalls.has(hall.id)}
                                    onCheckedChange={() => handleHallToggle(hall.id)}
                                />
                                <div className="pl-2">{hall.name}</div>
                            </div>
                        ))}

                        <div className="text-2xl pb-4 mt-4">Event Details</div>

                        <div className="mb-6">
                            <label className="text-sm font-medium mb-2 block">
                                Time of Day
                            </label>
                            <div className="px-2">
                                <span className="text-xs text-gray-500">
                                    {timeRange[0]}:00 - {timeRange[1]}:00
                                </span>
                                <Slider
                                    range
                                    min={0}
                                    max={24}
                                    step={1}
                                    value={timeRange}
                                    onChange={setTimeRange}
                                    marks={{
                                        0: <span className="text-xs">12a</span>,
                                        6: <span className="text-xs">6a</span>,
                                        12: <span className="text-xs">12p</span>,
                                        18: <span className="text-xs">6p</span>,
                                        24: <span className="text-xs">12a</span>
                                    }}
                                    className="mt-1"
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="text-sm font-medium mb-2 block">
                                Group Size
                            </label>
                            <div className="px-2">
                                <span className="text-xs text-gray-500">
                                    {groupSizeRange[0]} - {groupSizeRange[1]} people
                                </span>
                                <Slider
                                    range
                                    min={1}
                                    max={10}
                                    value={groupSizeRange}
                                    onChange={setGroupSizeRange}
                                    marks={{
                                        1: <span className="text-xs">1</span>,
                                        5: <span className="text-xs">5</span>,
                                        10: <span className="text-xs">10</span>
                                    }}
                                    className="mt-1"
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="text-sm font-medium mb-2 block">
                                Date Range
                            </label>
                            <div className="px-2">
                                <span className="text-xs text-gray-500">
                                    {dateRange[0]?.format('MMM D')} 
                                    {dateRange[1] ? ` - ${dateRange[1].format('MMM D')}` : 
                                     isSelectingEndDate ? ' (Select end date)' : ' (Select start date)'}
                                </span>
                                <div className="border rounded-md mt-1">
                                    <Calendar 
                                        fullscreen={false}
                                        onSelect={handleDateSelect}
                                        headerRender={headerRender}
                                        style={{ 
                                            width: '100%',
                                        }}
                                        disabledDate={date => {
                                            if (!isSelectingEndDate) return false;
                                            return date < dateRange[0];
                                        }}
                                        dateFullCellRender={(date) => {
                                            const isStart = dateRange[0]?.isSame(date, 'day');
                                            const isEnd = dateRange[1]?.isSame(date, 'day');
                                            const isInRange = dateRange[0] && dateRange[1] && 
                                                            date.isAfter(dateRange[0]) && 
                                                            date.isBefore(dateRange[1]);
                                            
                                            return (
                                                <div className={`
                                                    w-full h-full flex items-center justify-center p-1
                                                    text-xs
                                                    ${isStart || isEnd ? 'bg-blue-500 text-white rounded' : ''}
                                                    ${isInRange ? 'bg-blue-100' : ''}
                                                    hover:bg-blue-200 transition-colors
                                                `}>
                                                    {date.date()}
                                                </div>
                                            );
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        
                        {/* <div key='eat_together' className='flex items-center space-x-2 my-1'>
                                <Checkbox 
                                    id='eat_together_checkbox'
                                    checked={eatTogether}
                                    onCheckedChange={() => handleEatTogether(eatTogether)}
                                />
                                <div className="pl-2">
                                    <img className={eatTogether ? "border-b-4 dark:border-blue-900" : ""} src={eat_together} width="50"/>
                                </div>
                        </div> */}

                        <Button
                            onClick={() => {
                                setSelectedHalls(new Set());
                                setGroupSizeRange([1, 10]);
                                setDateRange([null, null]);
                                setTimeRange([0, 24]);
                                setIsSelectingEndDate(false);
                            }}
                            variant="outline"
                            className="mt-4 w-full"
                        >
                            Clear Filters
                        </Button>
                    </div>
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex mb-5 items-center gap-4">
                        <form className="flex-1">
                            <div className="relative w-full">
                                <input 
                                    type="search" 
                                    className="w-full p-2.5 text-sm text-gray-900 bg-white rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500" 
                                    placeholder="Search by host" 
                                    required 
                                />
                                <button type="submit" className="absolute right-0 top-0 h-full px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-r-md">
                                    <svg className="w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 20 20">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                </button>
                            </div>
                        </form>
                        <div className="flex gap-2">
                            <Button 
                                className={`h-10 px-4 ${sortOrder === 'newest' ? 'bg-blue-600 text-black dark:bg-blue-600 dark:text-black' : 'bg-white text-black dark:bg-white dark:text-black'}`}
                                onClick={() => handleSort('newest')} 
                            >
                                Newest
                            </Button>
                            <Button 
                                className={`h-10 px-4 ${sortOrder === 'oldest' ? 'bg-blue-600 text-black dark:bg-blue-600 dark:text-black' : 'bg-white text-black dark:bg-white dark:text-black'}`}
                                onClick={() => handleSort('oldest')} 
                            >
                                Oldest
                            </Button>
                            <img className={eatTogether ? "h-10 border-b-4 dark:border-blue-900 px-[0.2rem]" : "h-10"} src={eat_together} onClick={() => handleEatTogether(eatTogether)}/>

                            
                        </div>
                    </div>

                    {loading && <p>Loading events...</p>}
                    {error && <p className="text-red-500">Error: {error}</p>}
                    {!loading && !error && paginatedEvents.map((ev) => (
                        <EventCard 
                            key={ev.id} 
                            eventData={ev} 
                            onJoin={handleJoin} 
                            isJoinedPage={false}
                            hasJoined={userEvents.has(ev.id)}
                            isHost={ev.host?.id === userId}
                        />
                    ))}
                    
                    {totalPages > 1 && (
                        <div className="mt-4">
                            <MealsharePagination 
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        </div>
                    )}
                </div>
            </div>
            <Footer/>
        </>
    )
}
