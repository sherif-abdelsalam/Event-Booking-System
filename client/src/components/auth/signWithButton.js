export default function SignWithButton({ logo, sign_text }) {
  return (
    <div className="flex flex-row gap-4 items-center justify-center flex-1 border p-4 rounded-[8px] border-[#E5E7EB] bg-white hover:bg-[#F3F4F6] cursor-pointer">
      <img src={logo} alt={sign_text} className="w-[24px] h-[24px]" />
      <p className="font-openSans text-textGray">{sign_text}</p>
    </div>
  );
}
