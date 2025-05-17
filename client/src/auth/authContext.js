import { createContext, useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loading, setLoading] = useState(true);

    const location = useLocation();



    // New: Fetch user data from backend when token changes
    useEffect(() => {
        const initializeAuth = async () => {
            if (token) {
                try {
                    const userData = await fetchCurrentUser(token);
                    setUser(userData.data.user);
                    localStorage.setItem("token", token);
                    localStorage.setItem("user", JSON.stringify(userData.data.user));
                    if (location.pathname === "/login" || location.pathname === "/" || location.pathname === "/register") {
                        navigate("/home");
                    }
                } catch (error) {
                    console.error("Failed to fetch user", error);
                    logout();
                }
            } else {
                localStorage.removeItem("token");
                setUser(null);
            }
            setLoading(false);
        };

        initializeAuth();
    }, [token]);

    const login = async (receivedToken, userData) => {
        setToken(receivedToken);
        setUser(userData); // User data comes from backend login response
    };

    const logout = () => {
        setToken(null);
        setUser(null);
    };

    const isAuthenticated = () => !!user;

    const isAdmin = () => {
        if (user && user.role) {
            return user.role === "admin";
        }
        return false;
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout,
                isAuthenticated,
                isAdmin,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Helper function to fetch user data
async function fetchCurrentUser(token) {
    const response = await fetch(`${REACT_APP_API_URL}/users/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) throw new Error("Failed to fetch user");
    return await response.json();
}


export const useAuth = () => useContext(AuthContext);
