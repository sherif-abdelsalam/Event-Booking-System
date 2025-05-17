import GoBack from "../../components/events/goBack";
import AdminNavbar from "../../components/admin/adminNavbar";
import { useEffect, useState } from "react";
import ImagePreview from "../../components/events/imagePreview";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import ShowEventInfo from "../../components/events/showEventInfo";
import DeletePopup from "../../components/deletePopUp";

export default function AdminEventDetails() {

    const [event, setEvent] = useState({});
    const { eventId } = useParams();
    const navigate = useNavigate();

    const [showDelete, setShowDelete] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                localStorage.removeItem("token");
                navigate("/login", { replace: true });
                return;
            }

            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/events/${eventId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            if (!response.ok) {
                const res = await response.json();
                console.error("Error deleting event:", res.message);
                return;
            }

            setShowDelete(false);
            toast.success("Event deleted successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            setTimeout(() => {
                navigate("/admin/events");
            }, 3000);

        } finally {
            setIsDeleting(false);
        }
    };

    const fetchEvent = async () => {
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
            setEvent(data.data);

        } catch (error) {
            console.error("Error fetching event details:", error);
            toast.error("Failed to fetch event details");
        }
    };

    useEffect(() => {
        fetchEvent();
    }, []);

    return (<>
        <AdminNavbar />
        <div className='my-14 mx-32'    >
            <GoBack />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                <ImagePreview imageUrl={event.imageUrl} name={event.name} />
                <div className="flex flex-col gap-6">
                    <ShowEventInfo eventDetails={event} />

                    <button
                        onClick={() => navigate(`/admin/events/edit-events/${eventId}`)}
                        className="bg-green-700 p-3 text-center text-white font-semibold rounded-md"
                    >
                        Edit Event
                    </button>
                    <button
                        onClick={() => setShowDelete(true)}
                        className="bg-red-700 p-3 text-center text-white font-semibold rounded-md">
                        Delete Event
                    </button>
                </div>
                {
                    showDelete && (
                        <DeletePopup
                            itemName="Summer Festival Event"
                            onConfirm={handleDelete}
                            onCancel={() => setShowDelete(false)}
                            isLoading={isDeleting}
                        />
                    )
                }
            </div>
        </div>
        <ToastContainer />
    </>
    );
}
