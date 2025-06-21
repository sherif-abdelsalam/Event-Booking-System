import { format } from "date-fns";
import { Calendar, Clock } from "lucide-react";

export default function ShowEventInfo({ eventDetails }) {
  return (
    <>
      {eventDetails.category && (
        <p className="border-2 border-gray-300 dark:border-gray-600 py-1 px-4 rounded-full font-semibold text-gray-700 dark:text-gray-300 text-sm mr-auto">
          {eventDetails?.category?.name &&
            eventDetails.category.name.charAt(0).toUpperCase() +
              eventDetails.category.name.slice(1)}
        </p>
      )}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {eventDetails.name}
        </h1>

        {eventDetails.date && (
          <div className="flex items-center text-gray-600 dark:text-gray-400 mt-2">
            <Calendar className="h-5 w-5 mr-2" />
            <span>
              {format(new Date(eventDetails.date), "EEEE, MMMM d, yyyy")}
            </span>
          </div>
        )}

        {eventDetails.date && (
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Clock className="h-5 w-5 mr-2" />
            <span>{format(new Date(eventDetails.date), "h:mm a")}</span>
          </div>
        )}

        {eventDetails.venue && (
          <div className="flex items-center text-gray-600 dark:text-gray-400 mt-1">
            <svg
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>{eventDetails.venue}</span>
          </div>
        )}
      </div>

      <div className="border border-primary dark:border-secondary p-6 rounded-md bg-white dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-primary dark:text-secondary mb-4">
          Ticket Information
        </h2>
        <div className="flex justify-between items-center mb-2">
          <p className="text-gray-700 dark:text-gray-300">Price</p>
          <p className="font-semibold text-gray-900 dark:text-white">
            {eventDetails.price !== undefined
              ? `$${eventDetails.price.toFixed(2)}`
              : "Free"}
          </p>
        </div>

        {(eventDetails.capacity !== undefined ||
          eventDetails.available !== undefined) && (
          <div className="flex justify-between items-center mt-4">
            <p className="text-gray-700 dark:text-gray-300">Availability</p>
            <div className="text-right">
              {eventDetails.available !== undefined && (
                <p className="font-semibold text-gray-900 dark:text-white">
                  {eventDetails.available} tickets left
                </p>
              )}
              {eventDetails.capacity !== undefined && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total capacity: {eventDetails.capacity}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="mt-2">
        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
          About this event
        </h3>
        <p className="text-gray-700 dark:text-gray-300">
          {eventDetails.description}
        </p>
      </div>
    </>
  );
}
