import { useEffect, useState } from "react";
import EventCard from "./eventCard";

export default function GetEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/events`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Fetched events:", data.data);
      setEvents(data.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchEvents();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-40 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {events.map((event) => (
        <EventCard
          key={event._id}
          name={event.name}
          date={event.date}
          category={event.category}
          imageUrl={event.imageUrl}
          description={event.description}
          venue={event.venue}
          price={event.price}
          interestedCount={event.interestedCount}
        />
      ))}
      {events.length === 0 && <div>No events available.</div>}
    </div>
  );
}
