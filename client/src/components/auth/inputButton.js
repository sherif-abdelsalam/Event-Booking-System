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
    <div className="mb-10 relative">
      <label className="block text-textGray text-[18px] font-openSans mb-2">
        {title}
      </label>
      <input
        type={type}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        className={`border border-gray-300 rounded-md p-4 w-full focus:outline-none focus:ring-2 focus:border-transparent ${
          error ? " border-2 border-red-600" : "focus:ring-primary"
        } `}
        placeholder={placeholder}
      />
      {error && (
        <p className="absolute bottom-[-32px] text-red-600 ">{error}</p>
      )}
    </div>
  );
}
