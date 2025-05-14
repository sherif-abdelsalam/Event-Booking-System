import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./authContext";

const RoleRoute = () => {
    const { isAdmin, isAuthenticated, loading } = useAuth();
    if (loading) {
        return (
            <div className="h-full w-full flex justify-center items-center text-2xl font-bold text-primary bg-white">
                Loading...
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!loading && !isAdmin()) {
        console.log("-----------------------------------");
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
};

export default RoleRoute;
