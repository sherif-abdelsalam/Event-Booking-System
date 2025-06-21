import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/loader";
import { ArrowLeft } from "lucide-react";
import Navbar from "../components/home/navbar";
import { checkIsBooked } from "../utils/checkIsBooked";
import GoBack from "../components/events/goBack";
import ImagePreview from "../components/events/imagePreview";
import ShowEventInfo from "../components/events/showEventInfo";
import { useAuth } from "../auth/authContext";
const { toast, ToastContainer } = require("react-toastify");

const BASE_URL = process.env.REACT_APP_API_URL + "/api/v1";

export default function EventDetails() {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { token, isAuthenticated } = useAuth();

  const fetchEventDetails = useCallback(async () => {
    try {
      // Create headers object - only add auth if token exists
      const headers = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(`${BASE_URL}/events/${eventId}`, {
        headers,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setEventDetails(data.data);
    } catch (error) {
      console.error("Error fetching event details:", error);
      toast.error("Failed to fetch event details");
    } finally {
      setLoading(false);
    }
  }, [token, eventId]);

  useEffect(() => {
    fetchEventDetails();
  }, [fetchEventDetails]);

  const handleBookEvent = async () => {
    if (!isAuthenticated()) {
      navigate("/login", { replace: true });
      return;
    }

    const response = await checkIsBooked(token, eventId);

    if (!response.ok) {
      const res = await response.json();
      console.error("Error booking event:", res.message);
      return;
    }
    navigate(`/booking-confirmation/${eventId}`);
  };

  const handleCancelBooking = async () => {
    if (!isAuthenticated()) {
      navigate("/login", { replace: true });
      return;
    }

    try {
      const response = await fetch(
        `${BASE_URL}/bookings/${eventDetails.bookingId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
  };

  if (loading) {
    return <Loader />;
  }

  if (!eventDetails) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Event Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The event you're looking for doesn't exist or has been removed.
          </p>
          <button onClick={() => navigate("/events")}>
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
        <GoBack />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ImagePreview
            imageUrl={eventDetails.imageUrl}
            name={eventDetails.name}
          />

          {/* Details Section */}

          <div className="flex flex-col gap-6">
            <ShowEventInfo eventDetails={eventDetails} />

            {!isAuthenticated() ? (
              <div className="flex flex-col gap-2">
                <p className="bg-blue-50 border border-blue-200 p-3 text-center text-blue-700 font-medium rounded-md">
                  Please login to book this event
                </p>
                <button
                  onClick={() => navigate("/login")}
                  className="bg-blue-600 hover:bg-blue-700 p-3 text-center text-white font-semibold rounded-md transition-colors"
                >
                  Login to Book
                </button>
              </div>
            ) : eventDetails.isBooked ? (
              <div className="flex flex-col gap-2">
                <p className="bg-red-700 p-3 text-center text-white font-semibold rounded-md">
                  You have already booked this event.
                </p>
                <button
                  onClick={() => handleCancelBooking(eventDetails.eventId)}
                  className="bg-gray-200 hover:bg-gray-300 p-3 text-center text-gray-700 font-semibold rounded-md transition-colors"
                >
                  Cancel Booking
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleBookEvent(eventDetails.eventId)}
                className="bg-green-700 hover:bg-green-800 p-3 text-center text-white font-semibold rounded-md transition-colors"
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
