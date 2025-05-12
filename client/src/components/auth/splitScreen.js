import Logo from "../logo";
export default function SplitScreen({ sign, children }) {
  return (
    <div className="w-screen h-screen bg-primary flex flex-row">
      <div className="w-2/5 h-full pt-8 pl-8">
        <Logo />
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
