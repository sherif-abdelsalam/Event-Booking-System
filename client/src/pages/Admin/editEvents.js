import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CreateOrEditEvent from "./createOrEditEvent.js";

const BASE_URL = process.env.REACT_APP_API_URL + "/api/v1";

export default function EditEvents() {
    const { eventId } = useParams();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [event, setEvent] = useState({});

    const fetchEvent = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login", { replace: true });
                return;
            }
            setLoading(true);
            const response = await fetch(`${BASE_URL}/events/${eventId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setEvent(data.data);

        } catch (error) {
            console.error("Error fetching event details:", error);
            toast.error("Failed to fetch event details");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvent();
    }, [])
    if (loading) {
        return <Loader />
    }
    console.log(event);
    return (
        <CreateOrEditEvent event={event} isEdit={true} />
    );
}