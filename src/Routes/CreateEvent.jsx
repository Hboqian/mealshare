// src/pages/CreateEvent.jsx
import { useState } from "react"
import { Header, Footer } from "../components"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { createMealEvent } from "@/api/api"
import { Card, DatePicker, TimePicker, InputNumber } from 'antd';
import { ClockCircleOutlined, EnvironmentOutlined, TeamOutlined } from '@ant-design/icons';
import { Checkbox } from "@/components/ui/checkbox"
import { useNavigate } from "react-router-dom";

// Hardcoded Dining Halls list (IDs should match backend database)
// Can be fetched from backend, but hardcoded for demo
const DINING_HALLS = [
    {id:1, name:"John Jay Dining Hall", address:"519 W 114th St"},
    {id:2, name:"JJ's Place", address:"511 W 114th St"},
    {id:3, name:"Ferris Dining Hall", address:"2920 Broadway"},
    {id:4, name:"Chef Mike's", address:"3022 Broadway"},
    {id:5, name:"Chef Don's", address:"Mudd Building"}
]

export function CreateEvent(){
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [eatTogether, setEatTogether] = useState(false);
    const [selectedHall, setSelectedHall] = useState(null);
    const [spotsTotal, setSpotsTotal] = useState(1);
    const [message, setMessage] = useState(null);

    const userId = 1; // Assuming current user is logged in with id=1
    const navigate = useNavigate();

    const handleEatTogetherChange = (checked) => {
        setEatTogether(checked);
        if (checked) {
            setSpotsTotal(Math.max(2, spotsTotal));
        }
    };

    async function handleSubmit(e) {
        e.preventDefault();
        if(!selectedHall) {
            setMessage("Please select a dining hall.");
            return;
        }
        if(!date || !time) {
            setMessage("Please select event date and time.");
            return;
        }

        try {
            const eventDateTime = new Date(`${date}T${time}:00`);
            const isoString = eventDateTime.toISOString();
            
            const eventData = {
                host_id: userId,
                dining_hall_id: selectedHall.id,
                event_time: isoString,
                spots_total: spotsTotal,
                eat_together: eatTogether
            };
            const data = await createMealEvent(eventData);
            setMessage(`Event created successfully (ID: ${data.id})`);
            
            // Navigate to home page after successful creation
            setTimeout(() => {
                navigate('/');
            }, 1500);
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    }

    return(
        <div className="min-h-screen bg-gray-50">
            <Header />
            <Separator className="mb-0" />
            <div className="max-w-4xl mx-auto my-10 p-6">
                <Card className="w-full">
                    <h1 className="text-2xl font-semibold mb-6">Create Meal Sharing Event</h1>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Date, Time, and Eat Together Section */}
                        <div className="flex items-center gap-4">
                            <div className="w-1/3">
                                <label className="block text-sm font-medium mb-2">Event Date</label>
                                <DatePicker
                                    className="w-full"
                                    size="large"
                                    onChange={(date, dateString) => setDate(dateString)}
                                    required
                                />
                            </div>
                            <div className="w-1/3">
                                <label className="block text-sm font-medium mb-2">Event Time</label>
                                <TimePicker
                                    className="w-full"
                                    size="large"
                                    format="HH:mm"
                                    onChange={(time, timeString) => setTime(timeString)}
                                    required
                                />
                            </div>
                            <div className="w-1/3 pt-8">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="eat_together"
                                        checked={eatTogether}
                                        onCheckedChange={handleEatTogetherChange}
                                    />
                                    <label htmlFor="eat_together" className="text-sm font-medium">
                                        Eat together
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Dining Hall Selection */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                <EnvironmentOutlined className="mr-2" />
                                Select Dining Hall
                            </label>
                            <div className="grid grid-cols-3 gap-4">
                                {DINING_HALLS.map(hall => (
                                    <Card
                                        key={hall.id}
                                        className={`cursor-pointer transition-all ${
                                            selectedHall?.id === hall.id 
                                                ? 'border-blue-500 shadow-md' 
                                                : 'border-gray-200 hover:border-blue-300'
                                        }`}
                                        onClick={() => setSelectedHall(hall)}
                                    >
                                        <div className="p-3">
                                            <h3 className="font-medium text-sm">{hall.name}</h3>
                                            <p className="text-xs text-gray-500">{hall.address}</p>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        {/* Spots Section */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                <TeamOutlined className="mr-2" />
                                Number of Meal Swipes
                            </label>
                            <InputNumber
                                min={eatTogether ? 2 : 1}
                                value={spotsTotal}
                                onChange={(value) => setSpotsTotal(value)}
                                className="w-32"
                                size="large"
                            />
                        </div>

                        {message && (
                            <div className={`p-4 rounded-lg ${
                                message.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
                            }`}>
                                {message}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-8 text-xl font-semibold"
                        >
                            Create Event
                        </Button>
                    </form>
                </Card>
            </div>
            <Footer />
        </div>
    )
}
