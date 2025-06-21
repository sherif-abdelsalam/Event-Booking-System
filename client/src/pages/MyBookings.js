import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Trash2, Loader2, Calendar } from "lucide-react";
import { useAuth } from "../auth/authContext";
import Navbar from "../components/home/navbar";
import Loader from "../components/loader";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL + "/api/v1";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingBookingId, setDeletingBookingId] = useState(null);

  const { token, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Fetch user bookings
  const fetchBookings = useCallback(async () => {
    if (!token) return;

    try {
      setLoading(true);
      const response = await fetch(`${REACT_APP_API_URL}/bookings/myBookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }

      const data = await response.json();
      setBookings(data.data.bookings || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError("Failed to load bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Delete booking
  const deleteBooking = async (bookingId) => {
    if (!token) return;

    try {
      setDeletingBookingId(bookingId);
      const response = await fetch(
        `${REACT_APP_API_URL}/bookings/${bookingId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete booking");
      }

      // Remove the booking from the local state
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== bookingId)
      );
    } catch (error) {
      console.error("Error deleting booking:", error);
      setError("Failed to delete booking. Please try again.");
    } finally {
      setDeletingBookingId(null);
    }
  };

  // View event details
  const viewEventDetails = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }
    fetchBookings();
  }, [isAuthenticated, navigate, fetchBookings]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-10xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
            My Bookings
          </h1>

          {error && (
            <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {bookings.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                <Calendar className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
                <p className="text-xl font-medium text-gray-900 dark:text-white">
                  No bookings exist
                </p>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  You haven't made any event bookings yet.
                </p>
              </div>
              <button
                onClick={() => navigate("/events")}
                className="bg-primary dark:bg-secondary text-white dark:text-primary px-6 py-3 rounded-lg hover:bg-primaryHover dark:hover:bg-accent transition-colors"
              >
                Browse Events
              </button>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr className="text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      <th className="py-3">Event</th>
                      <th>Date & Time</th>
                      <th>Location</th>
                      <th>Booking Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-center bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {bookings.map((booking) => (
                      <tr
                        key={booking._id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex justify-start items-center">
                            <div className="flex-shrink-0 h-12 w-12">
                              <img
                                className="h-12 w-12 rounded-lg object-cover"
                                src={
                                  booking.eventId?.imageUrl ||
                                  "/assets/default-event.png"
                                }
                                alt={booking.eventId?.name || "Event"}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {booking.eventId?.name || "Event Not Found"}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {booking.eventId?.category?.name ||
                                  "No Category"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {booking.eventId?.date
                              ? new Date(
                                  booking.eventId.date
                                ).toLocaleDateString()
                              : "TBD"}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {booking.eventId?.date
                              ? new Date(
                                  booking.eventId.date
                                ).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })
                              : "Time TBD"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {booking.eventId?.venue || "Venue TBD"}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-3">
                            {/* View Event Icon */}
                            <button
                              onClick={() =>
                                viewEventDetails(booking.eventId?._id)
                              }
                              disabled={!booking.eventId?._id}
                              className="relative group p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
                              title="View Event"
                            >
                              <Eye className="w-5 h-5" />
                              {/* Tooltip */}
                              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 dark:bg-gray-700 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                                View Event
                              </span>
                            </button>

                            {/* Delete Icon */}
                            <button
                              onClick={() => deleteBooking(booking._id)}
                              disabled={deletingBookingId === booking._id}
                              className="relative group p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Delete Booking"
                            >
                              {deletingBookingId === booking._id ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                              ) : (
                                <Trash2 className="w-5 h-5" />
                              )}
                              {/* Tooltip */}
                              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 dark:bg-gray-700 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                                {deletingBookingId === booking._id
                                  ? "Deleting..."
                                  : "Delete Booking"}
                              </span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
