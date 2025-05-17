export const SelectButton = ({
    formik,
    categories
}) => (
    <div className="mb-3 relative">
        <label htmlFor="category" className="block text-textGray text-[16px] font-openSans">Event category</label>
        <select
            placeholder={"Select category"}
            id="category"
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:border-transparent ${formik.touched.category && formik.errors.category ? " border-2 border-red-600" : "focus:ring-primary"
                } `}        >
            <option value="">Select category</option>
            {categories.map((category) => (
                <option key={category._id} value={category._id}>
                    {category.name}
                </option>
            ))}
        </select>
        {formik.touched.category && formik.errors.category && (
            <p className="absolute bottom-[-20px] text-red-600 text-[14px]">{formik.errors.category}</p>
        )}

    </div>
);