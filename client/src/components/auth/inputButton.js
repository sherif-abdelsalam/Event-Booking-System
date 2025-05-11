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
    <div className="mb-8">
      <label className="block text-textGray text-[18px] font-openSans mb-2">
        {title}
      </label>
      <input
        type={type}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        className="border border-gray-300 rounded-md p-4 w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
