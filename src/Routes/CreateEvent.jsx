// src/pages/CreateEvent.jsx
import { useState } from "react"
import { Header, Footer } from "../components"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { createMealEvent } from "@/api/api"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"

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

        // Combine date and time into ISO format
        const eventDateTime = new Date(`${date}T${time}:00`);
        const isoString = eventDateTime.toISOString();

        try {
            const eventData = {
                host_id: userId,
                dining_hall_id: selectedHall.id,
                event_time: isoString,
                spots_total: spotsTotal,
                eat_together: eatTogether
            };
            const data = await createMealEvent(eventData);
            setMessage(`Event created successfully (ID: ${data.id})`);
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    }

    return(
        <>
            <Header/>
            <Separator/>
            <div className="mx-10 my-10">
                <h1 className="text-2xl mb-5">Create Event</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex space-x-4 items-center">
                        <div>
                            <label className="block mb-1 font-semibold">Event Date</label>
                            <Input type="date" value={date} onChange={(e)=>setDate(e.target.value)} required />
                        </div>
                        <div>
                            <label className="block mb-1 font-semibold">Event Time</label>
                            <Input type="time" value={time} onChange={(e)=>setTime(e.target.value)} required/>
                        </div>
                        <div className="flex items-center mt-6">
                            <Checkbox checked={eatTogether} onCheckedChange={val=>setEatTogether(val===true)} id="eat_together"/>
                            <label htmlFor="eat_together" className="pl-2 text-sm font-medium text-black leading-none">Eat Together 🍽</label>
                        </div>
                    </div>
                    
                    <div>
                        <label className="block mb-2 font-semibold">Location</label>
                        <div className="flex space-x-4 overflow-auto">
                            {DINING_HALLS.map(hall=>(
                                <Card key={hall.id} 
                                      className={`p-4 cursor-pointer border ${selectedHall?.id===hall.id ? 'border-blue-500' : 'border-gray-300'}`} 
                                      onClick={()=>setSelectedHall(hall)}>
                                    <p className="font-bold">{hall.name}</p>
                                    <p className="text-sm">{hall.address}</p>
                                </Card>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Button type="button" onClick={()=>setSpotsTotal(sp=>Math.max(1, sp-1))}>-</Button>
                        <p>{spotsTotal} Meal Swipe Offered</p>
                        <Button type="button" onClick={()=>setSpotsTotal(sp=>sp+1)}>+</Button>
                    </div>
                    
                    <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">Create Event</Button>
                    {message && <p className="mt-4 text-sm">{message}</p>}
                </form>
            </div>
            <Footer/>
        </>
        
    )
}
