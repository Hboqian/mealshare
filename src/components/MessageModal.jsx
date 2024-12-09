// src/components/MessageModal.jsx
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { fetchEventMessages, sendEventMessage } from "@/api/api"

export function MessageModal({ eventId, senderId, open, onClose }) {
    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState("");

    useEffect(() => {
        if (open && eventId) {
            fetchMessages();
        }
        async function fetchMessages() {
            try {
                const data = await fetchEventMessages(eventId);
                setMessages(data);
            } catch (e) {
                console.error(e);
            }
        }
    }, [open, eventId]);

    async function handleSend() {
        if (!content.trim()) return;
        try {
            const msg = await sendEventMessage(eventId, senderId, content.trim());
            setMessages((prev) => [...prev, msg]);
            setContent("");
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="fixed bottom-10 right-10 w-full max-w-md bg-white border border-gray-300 rounded-md p-4">
                <DialogHeader>
                    <DialogTitle>Event Messages</DialogTitle>
                </DialogHeader>
                <div className="overflow-auto h-64 border border-gray-200 p-2 mb-2">
                    {messages.map(m => (
                        <div key={m.id} className="mb-2">
                            <p className="text-sm text-gray-600">
                                <strong>{m.sender?.first_name}</strong>:
                            </p>
                            <p>{m.content}</p>
                        </div>
                    ))}
                </div>
                <DialogFooter className="flex space-x-2">
                    <Input 
                        value={content} 
                        onChange={(e)=>setContent(e.target.value)} 
                        placeholder="Type a message..." 
                    />
                    <Button onClick={handleSend}>Send</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
