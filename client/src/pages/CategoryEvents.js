import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/home/navbar";
import { useEffect, useState } from "react";
import Loader from "../components/loader";
import EventCard from "../components/home/eventCard";


const BASE_URL = process.env.REACT_APP_API_URL + "/api/v1";

export default function CategoryEvents() {
    const { categoryId } = useParams(); // Get the categoryId from the URL parameters
    const navigate = useNavigate(); // Initialize the navigate function
    const [categoryEvents, setCategoryEvents] = useState([]); // State to hold category events
    const [loading, setLoading] = useState(true); // State to manage loading    useEffect(() => {
    const fetchCategoryEvents = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login", { replace: true });
                return;
            }

            const response = await fetch(
                `${BASE_URL}/categories/${categoryId}/events`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setCategoryEvents(data.data); // Set the fetched category events to state
            console.log("Fetched category events:", data.data);
        } catch (error) {
            console.error("Error fetching category events:", error);
        } finally {
            setLoading(false); // Set loading to false after fetching data
        }
    };

    useEffect(() => {
        fetchCategoryEvents(); // Fetch category events when the component mounts
    }, [categoryId]); // Dependency array includes categoryId to refetch if it changes

    if (loading) {
        return <Loader />; // Show loading message while fetching data
    }



    return (
        <>
            <Navbar />
            <div className="flex flex-col mx-40 gap-8 mb-24">
                {!categoryEvents || categoryEvents.length === 0 ? <p className="font-bold text-xl text-primary text-center mt-8">No events found for this category.</p> : (<>


                    <p className="font-bold text-xl text-primary text-center mt-8">Discover {categoryEvents[0].category.name} Events</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {categoryEvents.map((event) => (
                            <EventCard
                                key={event._id}
                                eventId={event._id}
                                isBooked={event.isBooked}
                                name={event.name}
                                date={event.date}
                                category={event.category.name}
                                imageUrl={event.imageUrl}
                                description={event.description}
                                venue={event.venue}
                                price={event.price}
                            />
                        ))}
                    </div>
                </>)}
            </div>
        </>
    );
}