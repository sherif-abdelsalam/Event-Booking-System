import InputButton from "../auth/inputButton";
import { SelectButton } from "../selectButton";
import EventImageUpload from "./EventImageUpload";

export default function EventCreationInput({
    formik,
    categories,
    isEdit = false
}) {
    return < form onSubmit={formik.handleSubmit} className="flex flex-row gap-8" encType="multipart/form-data">


        <div className="flex-1">

            <InputButton
                type="text"
                name="name"
                title="Event name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={"Enter event name"}
                error={formik.touched.name && formik.errors.name ? formik.errors.name : null}
            />

            <SelectButton
                formik={formik}
                categories={categories}
            />

            <InputButton
                type="text"

                name="venue"
                title="Event venue"
                value={formik.values.venue}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={"Enter event venue"}
                error={formik.touched.venue && formik.errors.venue ? formik.errors.venue : null}
            />

            <InputButton
                type="date"
                name="date"
                title="Event date"
                value={formik.values.date}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={"Enter event date"}
                error={formik.touched.date && formik.errors.date ? formik.errors.date : null}
            />

            <InputButton
                type="number"
                name="price"
                title="Event price"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={"Enter event price"}
                error={formik.touched.price && formik.errors.price ? formik.errors.price : null}
            />

            <InputButton
                type="number"
                name="capacity"
                title="Event capacity"
                value={formik.values.capacity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={"Enter event capacity"}
                error={formik.touched.capacity && formik.errors.capacity ? formik.errors.capacity : null}
            />

            <label className="block text-textGray text-[16px] font-openSans">
                Event description
            </label>
            <textarea
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                rows={4}
                placeholder="Enter event description"
                className={`border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:border-transparent ${formik.touched.description && formik.errors.description ? " border-2 border-red-600" : "focus:ring-primary"
                    } `}
            />
            {formik.touched.description && formik.errors.description && (
                <p className="text-red-600 text-[14px]">{formik.errors.description}</p>
            )}



        </div>
        <div className="flex flex-col">
            <EventImageUpload
                image={formik.values.image}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.image && formik.errors.image ? formik.errors.image : null}
            />
            <button className="bg-primary font-semibold text-white py-3 rounded-md hover:bg-primaryDark" type="submit">
                {formik.isSubmitting && isEdit ? "Updating Event" : isEdit ? "Update Event" : formik.isSubmitting ? "Creating Event" : "Create Event"}
            </button>
        </div>


    </form>


}