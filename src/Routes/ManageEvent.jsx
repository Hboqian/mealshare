// src/pages/ManageEvent.jsx
import { useEffect, useState } from "react"
import { Header, Footer } from "../components"
import { Separator } from "@/components/ui/separator"
import { EventCard } from "@/components/EventCard"
import { MessageModal } from "@/components/MessageModal"
import { getUserEvents, leaveMealEvent } from "@/api/api"

export function ManageEvent() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [currentEventId, setCurrentEventId] = useState(null);
    const userId = 1; // Assuming logged in user ID

    async function loadEvents() {
        try {
            setLoading(true);
            const data = await getUserEvents(userId);
            setEvents(data);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadEvents();
    }, []);

    function handleMessage(eventId) {
        setCurrentEventId(eventId);
        setShowMessageModal(true);
    }

    async function handleLeave(eventId) {
        if (!window.confirm('Are you sure you want to leave this event?')) {
            return;
        }
        
        try {
            await leaveMealEvent(eventId, userId);
            window.alert('You have left the event successfully.');
            // Refresh events list
            await loadEvents();
        } catch (error) {
            window.alert(`Error: ${error.message}`);
        }
    }

    return (
        <>
            <Header/>
            <Separator/>
            <div className="mx-10 my-10">
                <h1 className="text-2xl mb-5">Manage Your Events</h1>
                {loading && <p>Loading events...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!loading && !error && events.map(ev => (
                    <EventCard 
                        key={ev.id} 
                        eventData={ev} 
                        isJoinedPage={true} 
                        onMessage={handleMessage}
                        onLeave={handleLeave}
                    />
                ))}
            </div>
            <MessageModal 
                eventId={currentEventId} 
                senderId={userId} 
                open={showMessageModal} 
                onClose={() => setShowMessageModal(false)} />
            <Footer/>
        </>
    )
}