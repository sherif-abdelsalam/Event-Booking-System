import GetEvents from "../components/home/events";
import Navbar from "../components/home/navbar";
import Footer from "../components/footer";

export default function AllEvents() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      <Navbar />
      <div className="mt-16 flex-grow">
        <GetEvents isViewAll={true} />
      </div>
      <Footer />
    </div>
  );
}
