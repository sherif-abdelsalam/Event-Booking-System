import { format } from "date-fns";
import defaultEventImage from "../../assets/default-event.png";
import { useNavigate } from "react-router-dom";
import { checkIsBooked } from "../../utils/checkIsBooked";
const { toast, ToastContainer } = require("react-toastify");
const getCategoryColor = (category) => {
    const categories = {
        music: "bg-purple-500",
        sports: "bg-blue-500",
        arts: "bg-pink-500",
        food: "bg-orange-500",
        tech: "bg-cyan-500",
        outdoor: "bg-green-500",
    };

    return categories[category.toLowerCase()] || "bg-gray-500";
};

const EventCard = (event) => {
    const {
        eventId,
        date,
        category,
        imageUrl,
        name,
        description,
        isBooked,
    } = event;

    const eventDate = new Date(date);
    console.log("Event Date:", date);
    const month = format(eventDate, "MMM").toUpperCase();
    const day = format(eventDate, "d");
    const navigate = useNavigate();
    // 
    const categoryColorClass = getCategoryColor(category);

    const bookEvent = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login", { replace: true });
            return;
        }
        const response = await checkIsBooked(token, eventId);

        if (!response.ok) {
            console.error("Error booking event:", response.message);
            return;
        }
        toast.success("Event booked successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
        navigate(`/booking-confirmation/${eventId}`);

    };
    return (
        <div
            className="w-full max-w-md overflow-hidden rounded-lg border shadow-md bg-white flex flex-col hover:transform hover:scale-105 transition-transform duration-300">
            <div onClick={() => navigate(`/events/${eventId}`)}>

                <div className="relative">
                    <img
                        src={imageUrl || defaultEventImage}
                        alt={name}
                        className="w-full h-48 object-cover"
                    />

                    {/* Category tag */}
                    <div className="absolute bottom-0 left-0 text-sm font-medium text-white">
                        <div className={`px-3 py-1 rounded-tr-md ${categoryColorClass}`}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </div>
                    </div>
                </div>

                <div className="p-4 flex">
                    {/* Date indicator */}
                    <div className="flex flex-col items-center justify-center mr-4 w-16">
                        <div className="text-purple-700 font-bold text-lg">{month}</div>
                        <div className="text-gray-800 font-bold text-2xl">{day}</div>
                    </div>

                    {/* Event details */}

                    <div >
                        <h2 className="text-lg font-bold text-gray-800 mb-1">{name}</h2>
                        <p className="text-gray-600 text-sm mb-2">
                            {description.length > 60
                                ? `${description.substring(0, 60)}...`
                                : description}
                        </p>


                        {/* Uncomment if you want to show time and venue */}
                        {/* <div className="text-gray-700 text-sm mb-1">{timeRange}</div>
                    <div className="text-gray-700 text-sm mb-2">{venue}</div>

                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <span className="text-gray-700">
                                <span className="font-medium">${price.toFixed(2)}</span>
                            </span>
                        </div>

                    </div> */}
                    </div>
                </div>

            </div>

            <div className="mt-auto">
                {isBooked ? (
                    <div className="bg-red-600 text-white font-semibold text-center text-md p-3">Booked</div>
                ) : (
                    <div
                        onClick={(e) => { bookEvent(); }} // Prevents the click from bubbling up to the Link
                        className="bg-green-600 text-white font-semibold text-center text-md p-3 hover:bg-green-900 cursor-pointer">Book Now</div>
                )}
            </div>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default EventCard;
