import { useNavigate } from "react-router-dom";
import { Search, Plus } from "lucide-react";
import { useEffect, useState } from "react";
function SearchAndAddEventBar({ events, setEvents, isAdminPage = false }) {
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        setEvents(events.filter((event) => event.name.toLowerCase().includes(searchValue.toLowerCase())));
    }, [searchValue]);

    const navigate = useNavigate();
    return (
        <div className="flex justify-between items-center mb-3">
            <div className="mr-5 bg-white rounded-lg px-4 py-[5px] flex items-center gap-2 w-[305px] h-[50px]">
                <Search />
                <input
                    type="text"
                    placeholder="Search for events"
                    className="w-full p-[10px] border-none text-[16px] font-normal leading-6 text-text-dark focus:outline-none"
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            </div>
            {isAdminPage && <button className="bg-accent text-primary border-none p-3 rounded-lg cursor-pointer text-base font-semibold leading-[19.36px] h-[44px] flex gap-2 items-center" onClick={() => navigate("/admin/events/create-event")}>
                <Plus />
                Add Event
            </button>}
        </div>
    )
}

export default SearchAndAddEventBar;
