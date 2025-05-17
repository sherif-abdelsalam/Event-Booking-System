import { useEffect, useState } from "react";
import EventCard from "./eventCard";
import { useNavigate } from "react-router-dom";
import Loader from "../loader";
import Pagination from "../admin/pagination";
import SearchAndAddEventBar from "../admin/searchAndAddEvent";

const BASE_URL = process.env.REACT_APP_API_URL + "/api/v1";
export default function GetEvents({ isViewAll = false }) {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    const fetchEvents = async (page) => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login", { replace: true });
                return;
            }

            const response = await fetch(
                `${BASE_URL}/events?page=${page}&limit=${eventsPerPage}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const res = await response.json();
            if (!response.ok) {
                throw new Error(`Error: ${res.message}`);
            }

            setEvents(res.data);
            setTotalEvents(res.totalEvents);
        } catch (error) {
            console.error("Error fetching events:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchEvents();
    }, []);

    /////////////////////

    const [currentPage, setCurrentPage] = useState(1);
    const [eventsPerPage] = useState(6);
    const [totalEvents, setTotalEvents] = useState(0);
    // const [searchValue, setSearchValue] = useState('');


    useEffect(() => {
        fetchEvents(currentPage);
    }, [currentPage]);

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
            <p className="font-bold text-xl text-primary">Discover Events</p>

            <SearchAndAddEventBar events={events} setEvents={setEvents} isAdmin={false} />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {!events && events.length === 0 ? <div className="font-semibold">No events available.</div> :
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
                    ))}
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
