import { useState, useRef } from "react";
import CategoriesList from "../components/home/categoriesList";
import GetEvents from "../components/home/events";
import Hero from "../components/home/hero";
import Navbar from "../components/home/navbar";

export default function Home() {
  const [heroSearchValue, setHeroSearchValue] = useState("");
  const eventsRef = useRef(null);

  const handleHeroSearch = (searchValue) => {
    setHeroSearchValue(searchValue);
    // Scroll to events section
    if (eventsRef.current) {
      eventsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar />
      <Hero onSearch={handleHeroSearch} />
      <CategoriesList />
      <div ref={eventsRef}>
        <GetEvents heroSearchValue={heroSearchValue} showSearch={false} />
      </div>
    </>
  );
}
