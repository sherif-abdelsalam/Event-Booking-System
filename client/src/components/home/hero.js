
import HeroBg from "../../assets/hero.png";
export default function Hero() {
    return <div
        className="bg-cover bg-center h-96 mb-24"
        style={{ backgroundImage: `url(${HeroBg})` }}
    >
        <div className="flex flex-col items-center justify-center h-full text-white">
            <h1 className="text-5xl font-bold">Welcome to <span className="text-secondary">Eventy </span></h1>
            <br />
            <h1 className="text-2xl font-bold">
                Discover amazing events happening near you.
            </h1>
        </div>

    </div>
}