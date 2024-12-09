// src/pages/HomePage.jsx
import { useEffect, useState } from "react"
import { Header, Footer, MealsharePagination } from "../components"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { EventCard } from "@/components/EventCard"
import { fetchMealEvents, joinMealEvent, fetchDiningHalls, getUserEvents } from "@/api/api"

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

    const filteredEvents = events.filter(event => 
        selectedHalls.size === 0 || selectedHalls.has(event.dining_hall.id)
    );

    const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
    const paginatedEvents = filteredEvents.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <>
            <Header/>
            <Separator/>
            <div className="grid grid-cols-3 gap-10 mx-10 my-10">
                <div>
                    <div className="flex flex-col border border-slate-300 px-2 py-2">
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
                        <p className="text-sm text-gray-500">More filters coming soon...</p>
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="flex mb-5">
                        <form className="mr-5 grow">
                            <div className="relative w-full">
                                <input 
                                    type="search" 
                                    className="p-2.5 text-sm text-gray-900 bg-white rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500" 
                                    placeholder="Search by host" required 
                                />
                                <button type="submit" className="absolute top-0 right-0 p-2.5 text-white bg-blue-600 hover:bg-blue-700 rounded-r-md">
                                    <svg className="w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 20 20">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                    <span className="sr-only">Search</span>
                                </button>
                            </div>
                        </form>
                        <Button 
                            className={`mx-2 w-22 h-8 my-auto ${sortOrder === 'newest' ? 'bg-blue-600' : ''}`}
                            onClick={() => handleSort('newest')} 
                            size="sm"
                        >
                            Newest
                        </Button>
                        <Button 
                            className={`mx-1 w-22 h-8 my-auto ${sortOrder === 'oldest' ? 'bg-blue-600' : ''}`}
                            onClick={() => handleSort('oldest')} 
                            size="sm"
                        >
                            Oldest
                        </Button>
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
