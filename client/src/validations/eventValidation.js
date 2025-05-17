import * as Yup from "yup";
export const eventValidationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .max(50, "Name must be at most 50 characters")
        .required("Name is required"),
    category: Yup.string().required("Category is required"),
    description: Yup.string()
        .min(10, "Description must be at least 10 characters")
        .max(1000, "Description must be at most 1000 characters")
        .required("Description is required"),
    date: Yup.date()
        .min(new Date(), "Date must be in the future")
        .typeError("Date must be a valid date")
        .required("Date is required"),
    venue: Yup.string().required("Venue is required"),
    price: Yup.number().required("Price is required"),
    capacity: Yup.number()
        .min(10, "Capacity must be at least 10")
        .required("Capacity is required"),
    image: Yup.mixed().required("Image is required"),
})