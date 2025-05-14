import { useEffect, useState } from "react";
import EventCard from "./eventCard";
import { useNavigate } from "react-router-dom";
import Loader from "../loader";
export default function GetEvents() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    const fetchEvents = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login", { replace: true });
                return;
            }
            const response = await fetch(`${process.env.REACT_APP_API_URL}/events`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const res = await response.json();
            if (!response.ok) {
                throw new Error(`Error: ${res.message}`);
            }
            console.log("Fetched events:", res.data);
            setEvents(res.data);
        } catch (error) {
            console.error("Error fetching events:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchEvents();
    }, []);
    if (loading) {
        return <Loader />;
    }

    return (
        <div className="flex flex-col mx-40 gap-8 mb-24">
            <p className="font-bold text-xl text-primary">Discover Events</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {!events && events.length === 0 ? <div className="font-semibold">No events available.</div> :
                    events.map((event) => (
                        <EventCard
                            key={event._id}
                            eventId={event._id}
                            name={event.name}
                            date={event.date}
                            category={event.category.name}
                            imageUrl={event.imageUrl}
                            description={event.description}
                            venue={event.venue}
                            price={event.price}
                            isBooked={event.isBooked}
                        />
                    ))}
            </div>
        </div>
    );
}
