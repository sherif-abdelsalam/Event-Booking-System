
import CategoriesList from "../components/home/categoriesList";
import GetEvents from "../components/home/events";
import Hero from "../components/home/hero";
import Navbar from "../components/home/navbar";
export default function Home() {

    return (<>
        < Navbar />
        <Hero />
        <CategoriesList />
        <GetEvents />
    </>
    );
}
