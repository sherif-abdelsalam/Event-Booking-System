import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../loader";

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const fetchCategories = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login", { replace: true });
                return;
            }

            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/categories`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            console.log("Fetched categories:", data.data);
            setCategories(data.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchCategories();
    }, []);

    if (loading) {
        return <Loader />;
    }
    return (
        <div className="flex flex-col mx-40 gap-4 mb-24" >
            <p className="font-bold text-xl text-primary">Explore Categories</p>
            <div className="flex flex-wrap justify-center items-center ">
                {categories.map((category) => (
                    <Link to={`/categories/${category._id}`} key={category._id} className="flex flex-col items-center justify-center hover:transform hover:scale-105 transition-transform duration-300">
                        <img src={category.image} alt={category.name} className="w-32 h-32 rounded-full shadow-md  m-4 flex items-center justify-center text-center text-xl font-bold text-primary" />
                        <div className="font-semibold">{category.name}</div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
