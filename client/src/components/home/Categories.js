import { useEffect, useState } from "react";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/events/categories`
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
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-2xl font-bold text-primary">Loading...</div>
      </div>
    );
  }
  return (
    <div className="flex flex-wrap justify-center items-center mx-40 flex-wrap">
      {categories.map((category) => (
        <div
          key={category}
          className="w-44 h-44 bg-gray-200 rounded-full shadow-md p-4 m-4 flex items-center justify-center text-center text-xl font-bold text-primary"
        >
          {category}
        </div>
      ))}
    </div>
  );
}
