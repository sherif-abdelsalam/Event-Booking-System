export default function InputButton({
    type,
    name,
    title,
    placeholder,
    value,
    onChange,
    onBlur,
    error,
}) {
    return (
        <div className="mb-6 relative">
            <label className="block text-textGray text-[16px] font-openSans">
                {title}
            </label>
            <input
                type={type}
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                className={`border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:border-transparent ${error ? " border-2 border-red-600" : "focus:ring-primary"
                    } `}
                placeholder={placeholder}
            />
            {error && (
                <p className="absolute bottom-[-20px] text-red-600 text-[14px]">{error}</p>
            )}
        </div>
    );
}
