import { useEffect, useState } from 'react';
import Image from '../image';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import ActionImage from "../../assets/more-circle.svg";
import Loader from '../loader';
import SearchAndAddEventBar from './searchAndAddEvent';

function CurrentEvents() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [eventsPerPage] = useState(5);
    const [totalEvents, setTotalEvents] = useState(0);
    const [searchValue, setSearchValue] = useState('');

    const navigate = useNavigate();
    const eventTableHeader = ["Photo", "Event Name", "Category", "Date", "Venue", "Price", "Action"];
    const [dropdownOpen, setDropdownOpen] = useState(null);

    const toggleDropdown = (index) => {
        setDropdownOpen(dropdownOpen === index ? null : index);
    };

    const fetchEvents = async (page) => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login", { replace: true });
                return;
            }

            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/events?page=${page}&limit=${eventsPerPage}`,
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
        fetchEvents(currentPage);
    }, [currentPage]);

    const totalPages = Math.ceil(totalEvents / eventsPerPage);

    const goToPage = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const filteredEvents = events.filter((event) =>
        event.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, startPage + 2);

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }


    if (loading) return <Loader />;

    return (
        <>
            <SearchAndAddEventBar setSearchValue={setSearchValue} />

            <table className='w-full'>
                <thead>
                    <tr>
                        {eventTableHeader.map((header, index) => (
                            <th key={index} className="px-6 text-center py-3 text-xs font-medium text-white uppercase tracking-wider bg-primary">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {filteredEvents.length === 0 && (
                        <tr>
                            <Td colspan="7">No events found!</Td>
                        </tr>
                    )}
                    {filteredEvents.map((event, index) => (
                        <tr key={index}
                            className="bg-white border-b-2 border-b-[#EBE5FF]"
                            onClick={() => navigate(`/events/${event._id}`)}
                        >
                            <Td>
                                <div className="flex items-center justify-center">
                                    <Image src={event.imageUrl} Class={"h-[48px] w-[64px] rounded-lg"} />
                                </div>
                            </Td>
                            <Td>{event?.name}</Td>
                            <Td>{event?.category?.name}</Td>
                            <Td>{format(new Date(event?.date), "dd/MM/yyyy")}</Td>
                            <Td>{event?.venue}</Td>
                            <Td>{event?.price}</Td>
                            <Td>
                                <div onClick={(e) => e.stopPropagation()} className="relative inline-block">
                                    <img
                                        src={ActionImage}
                                        alt="Action"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleDropdown(index);
                                        }}
                                        className="cursor-pointer"
                                    />
                                </div>
                            </Td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-4">
                    <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
                    >
                        Previous
                    </button>

                    {pageNumbers.map((page) => (
                        <button
                            key={page}
                            onClick={() => goToPage(page)}
                            className={`px-3 py-1 rounded ${currentPage === page
                                ? "bg-purple-600 text-white"
                                : "bg-gray-200 hover:bg-gray-300"
                                }`}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </>
    );
}

export default CurrentEvents;

const Td = ({ children, statusStyle, colspan }) => (
    <td colSpan={colspan}
        className={`p-[10px] text-center font-[600] text-[16px] border-b-2 border-[#ebe5ff] ${statusStyle || "text-text-medium"}`}
    >
        {children}
    </td>
);
