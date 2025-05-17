import { useFormik } from "formik";
import Loader from "../../components/loader";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { eventValidationSchema } from "../../validations/eventValidation";
import AddEventHeader from "../../components/admin/addEventHeader";
import EventCreationInput from "../../components/admin/eventCreationInput";
import { ArrowLeftCircle } from "lucide-react";

const baseUrl = process.env.REACT_APP_API_URL + "/api/v1";
const CreateOrEditEvent = ({ event, isEdit = false }) => {

    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loadCategories, setLoadCategories] = useState(false);


    // Fetch categories from API
    useEffect(() => {
        const fetchCategories = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                localStorage.removeItem("token");
                navigate("/login", { replace: true });
                return;
            }

            setLoadCategories(true);

            try {
                const response = await fetch(`${baseUrl}/categories`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                console.log("Fetched categories:", data.data);
                setCategories(data.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoadCategories(false);
            }
        };
        fetchCategories();
    }, []);


    const formik = useFormik({
        initialValues: {
            name: isEdit ? event.name : "",
            category: isEdit ? event.category._id : "",
            description: isEdit ? event.description : "",
            date: isEdit ? event.date : "",
            venue: isEdit ? event.venue : "",
            price: isEdit ? event.price : "",
            capacity: isEdit ? event.capacity : "",
            image: isEdit ? event.imageUrl : null,
        },
        validationSchema: eventValidationSchema,
        onSubmit: async (values) => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    localStorage.removeItem("token");
                    navigate("/login", { replace: true });
                    return;
                }

                const formData = new FormData();

                if (isEdit) {
                    if (values.image !== event.imageUrl) {
                        formData.append("image", values.image);
                    }
                    if (values.name !== event.name) {
                        formData.append("name", values.name);
                    }
                    if (values.category !== event.category._id) {
                        formData.append("category", values.category);
                    }
                    if (values.description !== event.description) {
                        formData.append("description", values.description);
                    }
                    if (values.date !== event.date) {
                        formData.append("date", values.date);
                    }
                    if (values.venue !== event.venue) {
                        formData.append("venue", values.venue);
                    }
                    if (values.price !== event.price) {
                        formData.append("price", values.price);
                    }
                    if (values.capacity !== event.capacity) {
                        formData.append("capacity", values.capacity);
                    }
                } else {
                    formData.append("name", values.name);
                    formData.append("category", values.category);
                    formData.append("description", values.description);
                    formData.append("date", values.date);
                    formData.append("venue", values.venue);
                    formData.append("price", values.price);
                    formData.append("capacity", values.capacity);
                    formData.append("image", values.image);
                }

                for (let [key, value] of formData.entries()) {
                    console.log(key, value);
                }

                const url = isEdit ? `${baseUrl}/events/${event._id}` : `${baseUrl}/events`;
                const method = isEdit ? "PUT" : "POST";


                const response = await fetch(url, {
                    method,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData
                });
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();
                console.log("Event created:", data);
                navigate("/admin/events"); // Redirect after success

            } catch (error) {
                console.error("Error creating event:", error);
            }
        },
    });



    if (loadCategories) {
        return (
            <Loader />
        )
    }
    return (
        <div className="my-14 mx-32 flex flex-col gap-8">
            <Link
                to={"/admin/events"}
                className="flex flex-row gap-4">
                <ArrowLeftCircle />
                <p>Back to event list</p>
            </Link>
            <AddEventHeader title={"Create Event"} hasDes={true} />
            <EventCreationInput formik={formik} categories={categories} isEdit={isEdit} />

        </div >

    );
};

export default CreateOrEditEvent;