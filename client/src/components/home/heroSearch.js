import { Search } from "lucide-react";
import { useState } from "react";

function HeroSearch({ onSearch }) {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-8">
      <div className="bg-white/90 backdrop-blur-sm rounded-full px-6 py-4 flex items-center gap-3 shadow-lg">
        <Search className="text-gray-500" size={20} />
        <input
          type="text"
          placeholder="Search for events..."
          className="flex-1 border-none text-gray-700 text-lg focus:outline-none bg-transparent placeholder-gray-500"
          value={searchValue}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
}

export default HeroSearch;
