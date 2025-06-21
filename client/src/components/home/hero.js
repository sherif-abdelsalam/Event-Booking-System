import HeroBg from "../../assets/hero.png";
import HeroSearch from "./heroSearch";

export default function Hero({ onSearch }) {
  return (
    <div
      className="bg-cover bg-center h-96 mb-24"
      style={{ backgroundImage: `url(${HeroBg})` }}
    >
      <div className="flex flex-col items-center justify-center h-full text-white px-4">
        <h1 className="text-5xl font-bold text-center">
          Welcome to <span className="text-secondary">Eventy</span>
        </h1>
        <br />
        <h1 className="text-2xl font-bold text-center mb-4">
          Discover amazing events happening near you.
        </h1>
        <HeroSearch onSearch={onSearch} />
      </div>
    </div>
  );
}
