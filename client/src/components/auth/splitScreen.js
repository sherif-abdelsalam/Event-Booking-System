import Logo from "../logo";
export default function SplitScreen({ sign, children }) {
  return (
    <div className="w-screen h-screen bg-primary dark:bg-gray-900 flex flex-row">
      <div className="w-2/5 h-full pt-8 pl-8">
        <Logo />
        <h1 className="font-bold text-[36px] text-white dark:text-gray-100 p-8 text-align-center mt-16">
          Discover tailored <br />
          events. <br /> {sign} for personalized <br />
          recommendations <br />
          today!
        </h1>
      </div>
      <div className="w-3/5 bg-white dark:bg-gray-800 flex items-center justify-center rounded-l-[48px]">
        {children}
      </div>
    </div>
  );
}
