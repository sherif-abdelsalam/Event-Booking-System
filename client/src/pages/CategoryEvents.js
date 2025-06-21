import { useParams } from "react-router-dom";
import Navbar from "../components/home/navbar";
import { useEffect, useState, useCallback } from "react";
import Loader from "../components/loader";
import EventCard from "../components/home/eventCard";
import { useAuth } from "../auth/authContext";

const BASE_URL = process.env.REACT_APP_API_URL + "/api/v1";

export default function CategoryEvents() {
  const { categoryId } = useParams();
  const [categoryEvents, setCategoryEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  const fetchCategoryEvents = useCallback(async () => {
    try {
      // Create headers object - only add auth if token exists
      const headers = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(
        `${BASE_URL}/categories/${categoryId}/events`,
        { headers }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCategoryEvents(data.data);
    } catch (error) {
      console.error("Error fetching category events:", error);
      setCategoryEvents([]);
    } finally {
      setLoading(false);
    }
  }, [categoryId, token]);

  useEffect(() => {
    fetchCategoryEvents();
  }, [fetchCategoryEvents]);

  if (loading) {
    return <Loader />; // Show loading message while fetching data
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col mx-40 gap-8 mb-24">
        {!categoryEvents || categoryEvents.length === 0 ? (
          <p className="font-bold text-xl text-primary text-center mt-8">
            No events found for this category.
          </p>
        ) : (
          <>
            <p className="font-bold text-xl text-primary text-center mt-8">
              Discover {categoryEvents[0].category.name} Events
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {categoryEvents.map((event) => (
                <EventCard
                  key={event._id}
                  eventId={event._id}
                  isBooked={event.isBooked}
                  name={event.name}
                  date={event.date}
                  category={event.category.name}
                  imageUrl={event.imageUrl}
                  description={event.description}
                  venue={event.venue}
                  price={event.price}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
