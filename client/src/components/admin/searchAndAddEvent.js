import { useNavigate } from "react-router-dom";
import { Search, Plus } from "lucide-react";
import { useState } from "react";

function SearchAndAddEventBar({
  events,
  setEvents,
  allEvents,
  isAdminPage = false,
}) {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    // Filter from the original full list, not the current filtered list
    const eventsToFilter = allEvents || events;
    const filteredEvents = eventsToFilter.filter((event) =>
      event.name.toLowerCase().includes(value.toLowerCase())
    );
    setEvents(filteredEvents);
  };

  return (
    <div className="flex justify-between items-center mb-3">
      <div className="mr-5 bg-white rounded-lg px-4 py-[5px] flex items-center gap-2 w-[305px] h-[50px]">
        <Search />
        <input
          type="text"
          placeholder="Search for events"
          className="w-full p-[10px] border-none text-[16px] font-normal leading-6 text-text-dark focus:outline-none"
          value={searchValue}
          onChange={handleSearchChange}
        />
      </div>
      {isAdminPage && (
        <button
          className="bg-accent text-primary border-none p-3 rounded-lg cursor-pointer text-base font-semibold leading-[19.36px] h-[44px] flex gap-2 items-center"
          onClick={() => navigate("/admin/events/create-event")}
        >
          <Plus />
          Add Event
        </button>
      )}
    </div>
  );
}

export default SearchAndAddEventBar;
