import { ArrowLeftCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function GoBack() {
  const navigate = useNavigate();
  return (
    <div className="mb-10">
      <button
        // variant="ghost"
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-secondary transition-colors"
      >
        <ArrowLeftCircle className="mr-2 h-4 w-4" />
        <span>Back to Events</span>
      </button>
    </div>
  );
}
