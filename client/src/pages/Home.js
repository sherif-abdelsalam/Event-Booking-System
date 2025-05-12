import Categories from "../components/home/Categories";
import GetEvents from "../components/home/events";
import Navbar from "../components/home/navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen bg-primary">
        <h1 className="text-4xl font-bold text-white">
          Welcome to Our Event Platform
        </h1>
        <p className="mt-4 text-lg text-white">
          Discover tailored events and personalized recommendations today!
        </p>
        <div className="mt-8">
          <button className="px-6 py-2 text-lg font-semibold text-white bg-secondary rounded-lg hover:bg-secondary-dark">
            Get Started
          </button>
        </div>
      </div>

      <Categories />

      <GetEvents />
    </div>
  );
}
