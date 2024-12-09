// src/components/EventCard.jsx
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const buttonStyles = "px-4 py-2 rounded-md text-white font-medium hover:opacity-90 transition-opacity";
const primaryButtonStyles = `${buttonStyles} bg-blue-600`;
const secondaryButtonStyles = `${buttonStyles} bg-green-600`;
const dangerButtonStyles = `${buttonStyles} bg-red-600`;

export function EventCard({ eventData, onJoin, onMessage, onLeave, isJoinedPage=false }) {
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
        <Card className="my-5 border border-gray-300">
            {dining_hall?.image_url && (
                <img src={dining_hall.image_url} className="mx-auto mt-5 w-1/2" alt="Dining Hall" />
            )}
            <CardContent>
                <p className="font-bold text-lg">{dining_hall?.name}</p>
                <p>{eventTime}</p>
                <div className="flex mt-2 items-center">
                    <p className="font-bold grow">
                        {spots_taken} Spot(s) Taken, {remaining} Remaining
                    </p>
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
            <CardFooter className="flex space-x-2">
                {!isJoinedPage ? (
                    <Button className={primaryButtonStyles} onClick={() => onJoin && onJoin(id)}>
                        Join
                    </Button>
                ) : (
                    <>
                        <Button className={secondaryButtonStyles} onClick={() => onMessage && onMessage(id)}>
                            Message
                        </Button>
                        {!is_host && (
                            <Button className={dangerButtonStyles} onClick={() => onLeave && onLeave(id)}>
                                Leave
                            </Button>
                        )}
                    </>
                )}
            </CardFooter>
        </Card>
    )
}
