import { useEffect, useState, useCallback } from "react";
import EventCard from "./eventCard";
import Loader from "../loader";
import Pagination from "../admin/pagination";
import SearchAndAddEventBar from "../admin/searchAndAddEvent";
import { useAuth } from "../../auth/authContext";
import { Link } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_API_URL + "/api/v1";

export default function GetEvents({
  isViewAll = false,
  heroSearchValue = "",
  showSearch = true,
}) {
  const [events, setEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]); // Keep original events for search
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(6);
  const [totalEvents, setTotalEvents] = useState(0);
  const { token } = useAuth();

  // Apply hero search filter
  useEffect(() => {
    if (heroSearchValue && allEvents.length > 0) {
      const filteredEvents = allEvents.filter((event) =>
        event.name.toLowerCase().includes(heroSearchValue.toLowerCase())
      );
      setEvents(filteredEvents);
    } else if (allEvents.length > 0) {
      setEvents(allEvents);
    }
  }, [heroSearchValue, allEvents]);

  const fetchEvents = useCallback(
    async (page = 1) => {
      setLoading(true);
      try {
        // Create headers object - only add auth if token exists
        const headers = {
          "Content-Type": "application/json",
        };

        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        const response = await fetch(
          `${BASE_URL}/events?page=${page}&limit=${eventsPerPage}`,
          {
            method: "GET",
            headers,
          }
        );

        const res = await response.json();
        if (!response.ok) {
          throw new Error(`Error: ${res.message}`);
        }

        setEvents(res.data);
        setAllEvents(res.data); // Store original events
        setTotalEvents(res.totalEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
        // Don't redirect to login for public events viewing
        setEvents([]);
        setAllEvents([]);
      } finally {
        setLoading(false);
      }
    },
    [token, eventsPerPage]
  );
  useEffect(() => {
    fetchEvents(currentPage);
  }, [currentPage, fetchEvents]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const totalPages = Math.ceil(totalEvents / eventsPerPage);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, startPage + 2);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  ///////////////
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col mx-40 gap-8 mb-24">
      <div className="flex items-center justify-between mb-4">
        <p className="font-bold text-xl text-primary dark:text-secondary">
          Discover Events
        </p>
        {!isViewAll && (
          <Link
            to="/events"
            className="bg-secondary text-primary font-semibold px-4 py-2 rounded-md hover:bg-accent transition-colors dark:bg-secondary dark:text-primary"
          >
            View All
          </Link>
        )}
      </div>

      {showSearch && (
        <SearchAndAddEventBar
          events={events}
          setEvents={setEvents}
          allEvents={allEvents}
          isAdmin={false}
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {!events && events.length === 0 ? (
          <div className="font-semibold dark:text-white">
            No events available.
          </div>
        ) : (
          events.map((event) => (
            <EventCard
              key={event._id}
              eventId={event._id}
              name={event.name}
              date={event.date}
              category={event.category.name}
              imageUrl={event.imageUrl}
              description={event.description}
              venue={event.venue}
              price={event.price}
              isBooked={event.isBooked}
            />
          ))
        )}
      </div>
      {totalPages > 1 && isViewAll && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          goToPage={goToPage}
          pageNumbers={pageNumbers}
        />
      )}
    </div>
  );
}
