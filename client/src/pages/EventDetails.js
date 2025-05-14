import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/loader";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Image from "../components/image";
import { format } from "date-fns";
import Navbar from "../components/home/navbar";
import { checkIsBooked } from "../utils/checkIsBooked";
const { toast, ToastContainer } = require("react-toastify");

export default function EventDetails() {
    const { eventId } = useParams();
    const [eventDetails, setEventDetails] = useState({});
    const [loading, setLoading] = useState(true);
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
            console.log("Fetched event details:", data.data);
            setEventDetails(data.data);

        } catch (error) {
            console.error("Error fetching event details:", error);
            toast.error("Failed to fetch event details");
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEventDetails();
    }, [eventId]);

    const handleBookEvent = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login", { replace: true });
            return;
        }
        const response = await checkIsBooked(token, eventId);

        if (!response.ok) {
            const res = await response.json();
            console.error("Error booking event:", res.message);
            return;
        }

        // refresh the page after booking
        window.location.reload();
        // Handle successful booking here, e.g., show a success message or update the UI
        toast.success("Event booked successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    const handleCancelBooking = async () => {


        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login", { replace: true });
            return;
        }
        try {

            const response = await fetch(`${process.env.REACT_APP_API_URL}/bookings/${eventDetails.bookingId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                const res = await response.json();
                console.error("Error canceling booking:", res.message);
                return;
            }

            toast.success("Event canceled successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,

            });

            // refresh the page after canceling
            window.location.reload();


        } catch (error) {
            console.error("Error canceling booking:", error);
        }
        // Handle successful canceling here, e.g., show a success message or update the UI
    };


    if (loading) {
        return <Loader />;
    }

    if (!eventDetails) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Event Not Found</h1>
                    <p className="text-gray-600 mb-6">The event you're looking for doesn't exist or has been removed.</p>
                    <button onClick={() => navigate('/events')}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Events
                    </button>
                </div>
            </div>
        );
    }




    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
                <div className="mb-10">
                    <button
                        // variant="ghost"
                        onClick={() => navigate(-1)}
                        className="flex items-center text-gray-700 hover:text-primary"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        <span>Back to Events</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col space-y-4">
                        <div className="rounded-xl overflow-hidden bg-gray-100 aspect-video">
                            {eventDetails.imageUrl ? (
                                <Image
                                    src={eventDetails.imageUrl}
                                    alt={eventDetails.name}
                                    Class="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                    <span className="text-gray-400">No image available</span>
                                </div>
                            )}


                        </div>
                    </div>



                    {/* Details Section */}

                    <div className="flex flex-col gap-6">
                        {eventDetails.category && (
                            <p className="border-2 py-1 px-4 rounded-full font-semibold text-gray-700 text-sm mr-auto">
                                {eventDetails?.category?.name &&
                                    eventDetails.category.name.charAt(0).toUpperCase() +
                                    eventDetails.category.name.slice(1)}
                            </p>
                        )}
                        <div className="space-y-2">

                            <h1 className="text-3xl font-bold text-gray-900">{eventDetails.name}</h1>

                            {eventDetails.date && (
                                <div className="flex items-center text-gray-600 mt-2">
                                    <Calendar className="h-5 w-5 mr-2" />
                                    <span>{format(new Date(eventDetails.date), 'EEEE, MMMM d, yyyy')}</span>
                                </div>
                            )}

                            {eventDetails.date && (
                                <div className="flex items-center text-gray-600">
                                    <Clock className="h-5 w-5 mr-2" />
                                    <span>{format(new Date(eventDetails.date), 'h:mm a')}</span>
                                </div>
                            )}

                            {eventDetails.venue && (
                                <div className="flex items-center text-gray-600 mt-1">
                                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>{eventDetails.venue}</span>
                                </div>
                            )}
                        </div>

                        <div className="border p-6 border-primary rounded-md ">
                            <h2 className="text-lg font-semibold text-primary mb-4">Ticket Information</h2>
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-gray-700">Price</p>
                                <p className="font-semibold">
                                    {eventDetails.price !== undefined ? (
                                        `$${eventDetails.price.toFixed(2)}`
                                    ) : (
                                        "Free"
                                    )}
                                </p>
                            </div>

                            {(eventDetails.capacity !== undefined || eventDetails.available !== undefined) && (
                                <div className="flex justify-between items-center mt-4">
                                    <p className="text-gray-700">Availability</p>
                                    <div className="text-right">
                                        {eventDetails.available !== undefined && (
                                            <p className="font-semibold">{eventDetails.available} tickets left</p>
                                        )}
                                        {eventDetails.capacity !== undefined && (
                                            <p className="text-sm text-gray-500">Total capacity: {eventDetails.capacity}</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mt-2">
                            <h3 className="text-lg font-semibold mb-2">About this event</h3>
                            <p className="text-gray-700">{eventDetails.description}</p>
                        </div>
                        {eventDetails.isBooked ? (
                            <div className="flex flex-col gap-2">

                                <p className="bg-red-700 p-3 text-center  text-white font-semibold rounded-md">
                                    You have already booked this event.
                                </p>

                                <button
                                    onClick={() => handleCancelBooking(eventDetails.eventId)}
                                    className="bg-gray-200 p-3 text-center text-gray-400 font-semibold rounded-md">
                                    Cancel Booking

                                </button>


                            </div>
                        ) : (
                            <button
                                onClick={() => handleBookEvent(eventDetails.eventId)}
                                className="bg-green-700 p-3 text-center text-white font-semibold rounded-md"
                            >
                                Book Now
                            </button>
                        )}

                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}
