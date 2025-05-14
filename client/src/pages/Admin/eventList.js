import CurrentEvents from "../../components/admin/currentEvents";
import Loader from "../../components/loader";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function EventList() {
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
        <div className='my-14 mx-5'>

            <CurrentEvents
                events={events}
            />

            <ToastContainer
                position="top-right"
            />
        </div>
    );
}