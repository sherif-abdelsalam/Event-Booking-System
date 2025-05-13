import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/loader";

export default function EventDetails() {
    const { eventId } = useParams();
    console.log("Event ID from URL:", eventId); // Log the eventId for debugging
    const [eventDetails, setEventDetails] = useState(null); // State to hold event details
    const [loading, setLoading] = useState(true); // State to manage loading
    const navigate = useNavigate();

    const fetchEventDetails = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login", { replace: true });
                return;
            }
            const response = await fetch(`${process.env.REACT_APP_API_URL}/events/${eventId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setEventDetails(data.data); // Set the fetched event details to state
            console.log("Fetched event details:", data.data);
        } catch (error) {
            console.error("Error fetching event details:", error);
        } finally {
            setLoading(false); // Set loading to false after fetching data
        }
    };

    useEffect(() => {
        fetchEventDetails(); // Fetch event details when the component mounts
    }, [eventId]); // Dependency array includes eventId to refetch if it changes

    if (loading) {
        return <Loader />; // Show loading message while fetching data
    }

    if (!eventDetails) {
        return <div>No event details found.</div>; // Handle case when event details are not found
    }

    return (
        <div>
            {eventDetails && (
                <div>
                    <h2>{eventDetails.name}</h2>
                    <p>{eventDetails.description}</p>
                    {/* Display other event details */}
                </div>
            )}
        </div>
    );
}