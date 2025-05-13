import React from "react";
import { format } from "date-fns";
import { Star } from "lucide-react";
import defaultEventImage from "../../assets/default-event.png";

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
        date,
        category,
        imageUrl,
        name,
        description,
        venue,
        price,
    } = event;

    const eventDate = new Date(date);
    console.log("Event Date:", date);
    const month = format(eventDate, "MMM").toUpperCase();
    const day = format(eventDate, "d");
    const timeRange = format(eventDate, "h:mm a");

    const categoryColorClass = getCategoryColor(category);

    return (
        <div className="w-full max-w-md overflow-hidden rounded-lg border border-purple-300 shadow-md bg-white">
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
                <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-800 mb-1">{name}</h2>
                    <p className="text-gray-600 text-sm mb-2">
                        {description.length > 60
                            ? `${description.substring(0, 60)}...`
                            : description}
                    </p>
                    <div className="text-gray-700 text-sm mb-1">{timeRange}</div>
                    <div className="text-gray-700 text-sm mb-2">{venue}</div>

                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <span className="text-gray-700">
                                <span className="font-medium">${price.toFixed(2)}</span>
                            </span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
