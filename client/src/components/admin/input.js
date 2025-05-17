export const Input = ({ type, name, value, onChange, placeholder, required, min, maxLength, rows, inValid }) => (
    <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        maxLength={maxLength}
        rows={rows}
        className={`w-full h-12 px-3 py-2 text-lg text-gray-700 border border-gray-200 rounded-lg focus:outline-none placeholder-gray-400 font-normal ${inValid && 'border-red-500'}`}
    />
);


export const InputLabel = ({ children }) => (
    <label className="block text-text-medium text-[16px] font-[600] mb-2">
        {children} <span className="text-red-500">*</span>
    </label>
);