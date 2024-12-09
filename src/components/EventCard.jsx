// src/components/EventCard.jsx
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const buttonStyles = "px-4 py-2 rounded-md text-white font-medium hover:opacity-90 transition-opacity";
const primaryButtonStyles = `${buttonStyles} bg-blue-600`;
const secondaryButtonStyles = `${buttonStyles} bg-green-600`;
const dangerButtonStyles = `${buttonStyles} bg-red-600`;

export function EventCard({ eventData, onJoin, onMessage, onLeave, isJoinedPage=false, hasJoined=false, isHost=false }) {
    const {
        id,
        event_time,
        spots_total,
        spots_taken,
        dining_hall,
        host,
        is_host
    } = eventData;

    const remaining = spots_total - spots_taken;
    const eventTime = new Date(event_time).toLocaleString();

    return (
        <Card className="my-3 border border-gray-300">
            <div className="flex">
                {dining_hall?.image_url && (
                    <img src={dining_hall.image_url} className="w-1/3 h-48 object-cover" alt="Dining Hall" />
                )}
                <div className="flex flex-col flex-1">
                    <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-bold text-lg">{dining_hall?.name}</p>
                                <p className="text-gray-600">{eventTime}</p>
                                <p className="font-bold mt-2">
                                    {spots_taken} Spot(s) Taken, {remaining} Remaining
                                </p>
                            </div>
                            {host && (
                                <div className="flex items-center">
                                    <Avatar className='inline-flex'>
                                        <AvatarImage src={host.photo_url} />
                                        <AvatarFallback>{host.first_name?.[0]}{host.last_name?.[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="mx-3">
                                        <p>{host.first_name}</p>
                                        <p className="font-light">Host</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className="mt-auto p-4 pt-0 flex gap-2">
                        {isJoinedPage ? (
                            <>
                                <Button className={secondaryButtonStyles} onClick={() => onMessage && onMessage(id)}>
                                    Message
                                </Button>
                                <Button className={dangerButtonStyles} onClick={() => onLeave && onLeave(id)}>
                                    {isHost ? 'Dissolve Event' : 'Leave'}
                                </Button>
                            </>
                        ) : (
                            <>
                                {isHost ? (
                                    <span className="text-blue-600 font-medium">You're hosting ✓</span>
                                ) : hasJoined ? (
                                    <span className="text-green-600 font-medium">Joined ✓</span>
                                ) : (
                                    <Button className={primaryButtonStyles} onClick={() => onJoin && onJoin(id)}>
                                        Join
                                    </Button>
                                )}
                            </>
                        )}
                    </CardFooter>
                </div>
            </div>
        </Card>
    )
}
