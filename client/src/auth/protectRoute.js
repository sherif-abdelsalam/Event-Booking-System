import { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./authContext";

const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Check if the user is authenticated
        if (!isAuthenticated) {
            // Redirect to login page if not authenticated
            navigate("/", { state: { from: location }, replace: true });
        }
    }, [isAuthenticated, navigate, location]);

    if (!isAuthenticated) {
        // Redirect to login page if the user is not authenticated
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
