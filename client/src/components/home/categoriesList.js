import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Loader from "../loader";
import { useAuth } from "../../auth/authContext";

const BASE_URL = process.env.REACT_APP_API_URL + "/api/v1";

export default function CategoriesList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  const fetchCategories = useCallback(async () => {
    try {
      // Create headers object - only add auth if token exists
      const headers = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(`${BASE_URL}/categories`, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCategories(data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col mx-40 gap-4 mb-24">
      <p className="font-bold text-xl text-primary dark:text-secondary">
        Explore Categories
      </p>
      <div className="flex flex-wrap justify-center items-center">
        {categories.map((category) => (
          <Link
            to={`/categories/${category._id}`}
            key={category._id}
            className="flex flex-col items-center justify-center hover:transform hover:scale-105 transition-transform duration-300"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-32 h-32 rounded-full border-2 border-white dark:border-2 shadow-md m-4 flex items-center justify-center text-center text-xl font-bold text-primary"
            />
            <div className="font-semibold dark:text-white">
              {category?.name[0].toUpperCase() + category?.name.slice(1)}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
