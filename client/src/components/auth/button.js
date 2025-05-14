export default function Button({ textContent, onClick, type }) {
    console.log(type);
    return (
        <button
            type={type}
            onClick={onClick}
            className="bg-primary text-white font-bold p-3 rounded-md w-full text-[16px] hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 mb-7"
        >
            {textContent}
        </button>
    );
}
