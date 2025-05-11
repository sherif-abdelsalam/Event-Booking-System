import { Link } from "react-router-dom";
export default function SplitScreen({ sign, children }) {
  return (
    <div className="w-screen h-screen bg-primary flex flex-row">
      <div className="w-2/5 h-full pt-8 pl-8">
        <Link to="/">
          <div className="flex flex-row items-center gap-1 mb-10">
            <img src="/assets/logo.png" alt="Logo" className="w-[50px] " />
            <h1 className="font-lalezar text-secondary text-[42px] font-bold tracking-[1px]">
              Eventy
            </h1>
          </div>
        </Link>

        <h1 className="font-bold text-[48px] text-white p-8 text-align-center">
          Discover tailored <br />
          events. <br /> {sign} for personalized <br />
          recommendations <br />
          today!
        </h1>
      </div>
      <div className="w-3/5 bg-white flex items-center justify-center rounded-l-[48px]">
        {children}
      </div>
    </div>
  );
}
