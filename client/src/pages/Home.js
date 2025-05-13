
import Categories from "../components/home/categories";
import GetEvents from "../components/home/events";
import Hero from "../components/home/hero";
import Navbar from "../components/home/navbar";
export default function Home() {

    return (<>
        < Navbar />
        <Hero />
        <Categories />
        <GetEvents />
    </>
    );
}
