import GetEvents from "../components/home/events";
import Navbar from "../components/home/navbar";

export default function AllEvents() {
    return (
        <>
            <Navbar />
            <div className="mt-16">
                <GetEvents isViewAll={true} />
            </div>
        </>
    );
}