
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { toast } from "react-toastify";
import { format } from "date-fns";
import Loader from "../components/loader";

const BASE_URL = process.env.REACT_APP_API_URL + "/api/v1";
const BookingConfirmation = () => {
    const { eventId } = useParams();
    const [eventDetails, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchEventDetails = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login", { replace: true });
                return;
            }
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

            console.log("Fetched event details:", data.data);
        } catch (error) {
            console.error("Error fetching event details:", error);
            toast.error("Failed to fetch event details");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEventDetails();
    }, []);



    if (loading) return <Loader />
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#E5DEFF] to-white p-4">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
            >
                <div className="rounded-full bg-[#9b87f5] p-3 w-20 h-20 mx-auto flex items-center justify-center">
                    <Check className="w-10 h-10 text-white" strokeWidth={3} />
                </div>
            </motion.div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-center mb-8"
            >
                <h1 className="text-4xl font-bold text-[#1A1F2C] mb-2">Congratulations!</h1>
                <p className="text-xl text-[#7E69AB]">Your booking is confirmed</p>
            </motion.div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="w-full max-w-md"
            >
                {/* Card container */}
                <div className="rounded-lg border border-[#D6BCFA] bg-white shadow-lg">
                    {/* Card header */}
                    <div className="bg-[#9b87f5] text-white rounded-t-lg flex flex-col space-y-1.5 p-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-semibold leading-none tracking-tight">Booking Details</h3>
                            {/* Badge */}
                            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors bg-white text-[#7E69AB]">
                                Confirmed
                            </div>
                        </div>
                    </div>

                    {/* Card content */}
                    <div className="p-6 pt-6">
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground">Event</h3>
                                <p className="text-lg font-semibold">{eventDetails?.name}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground">Date</h3>
                                    <p className="font-medium">{format(new Date(eventDetails?.date), "dd MMMM yyyy")}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground">Venue</h3>
                                    <p className="font-medium">{eventDetails.venue}</p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground">Category</h3>
                                    <p className="font-medium">{eventDetails?.category?.name}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground">Price</h3>
                                    <p className="font-medium">{eventDetails?.price}$</p>
                                </div>

                            </div>

                        </div>
                    </div>

                    {/* Card footer */}
                    <div className="flex flex-col gap-4 p-6 pt-0">

                        <div className="flex flex-col sm:flex-row gap-3 w-full">
                            <Link to="/home" className="w-full text-[#9b87f5] border border-[#9b87f5] rounded-md py-2 te text-center hover:bg-[#9b87f5] hover:text-white">
                                Browse More Events
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default BookingConfirmation;
