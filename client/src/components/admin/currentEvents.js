import { useState } from 'react';
import Image from '../image';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import ActionImage from "../../assets/more-circle.svg"

function CurrentEvents({ events }) {
    let eventTableHeader = ["Photo", "Event Name", "Category", "Date", "Venue", "Price", "Action"];
    const navigate = useNavigate();

    const [dropdownOpen, setDropdownOpen] = useState(null);
    const toggleDropdown = (index) => {
        setDropdownOpen(dropdownOpen === index ? null : index);
    };



    return (
        <table className=' w-full'>
            <thead>
                <tr>
                    {eventTableHeader.map((header, index) => (
                        <th
                            key={index}
                            className="px-6 text-center py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {events.length === 0 && (
                    <tr>
                        <Td colspan="7">No products found!</Td>
                    </tr>
                )}
                {events.map((event, index) => (
                    <tr key={index}
                        className={"bg-white border-b-2 border-b-[#EBE5FF]"}
                        onClick={() => navigate(`/events/${event._id}`)}
                    >
                        <Td>
                            <div className="flex items-center justify-center">
                                <Image src={event.imageUrl} Class={"h-[48px] w-[64px] rounded-lg"} />
                            </div>

                        </Td>

                        <Td>{event?.name}</Td>
                        <Td>{event?.category.name}</Td>
                        <Td>{format(new Date(event?.date), "dd/MM/yyyy")}</Td>
                        <Td>{event?.venue}</Td>
                        <Td>{event?.price}</Td>

                        <Td >
                            <div
                                onClick={(e) => e.stopPropagation()}
                                className={`relative inline-block`}>
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

    );
}

export default CurrentEvents;

const Td = ({ children, statusStyle, colspan }) => (
    <td colSpan={colspan}
        className={`p-[10px] text-center font-[600] text-[16px] border-b-2 border-[#ebe5ff] ${statusStyle ? statusStyle : "text-text-medium"}`}
    >
        {children}
    </td>
);

const DropDownItem = ({ children, onClick }) => (
    <div
        onClick={onClick}
        className="px-3 py-2 cursor-pointer text-sm hover:bg-[#f1f1f1]">
        {children}
    </div>
)