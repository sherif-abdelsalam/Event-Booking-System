import { toast } from "react-toastify";
import DeletePopup from "../deletePopUp";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function ActionDropdown({ eventId }) {

    const [showDelete, setShowDelete] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();

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
                window.location.reload();

            }, 3000);

        } finally {
            setIsDeleting(false);
        }
    };
    return (
        <>
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                <ul className="py-2">
                    <li
                        onClick={() => navigate(`/admin/events/edit-events/${eventId}`)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b" >Edit</li>
                    <li
                        onClick={() => setShowDelete(true)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Delete</li>
                </ul>
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
        </>
    );
}
