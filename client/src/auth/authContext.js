import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL + "/api/v1";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // Memoized functions to prevent unnecessary re-renders
  const isAuthenticated = useCallback(() => !!user, [user]);
  const isAdmin = useCallback(() => user?.role === "admin", [user]);

  // Clear auth data
  const clearAuth = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }, []);

  // Logout function
  const logout = useCallback(() => {
    clearAuth();
    navigate("/login");
  }, [clearAuth, navigate]);

  // Fetch current user with better error handling
  const fetchCurrentUser = useCallback(async (authToken) => {
    try {
      const response = await fetch(`${REACT_APP_API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }

      return await response.json();
    } catch (error) {
      console.error("Failed to fetch user:", error);
      throw error;
    }
  }, []);

  // Login function
  const login = useCallback(
    async (receivedToken, userData) => {
      try {
        setToken(receivedToken);
        setUser(userData);
        localStorage.setItem("token", receivedToken);
        localStorage.setItem("user", JSON.stringify(userData));
      } catch (error) {
        console.error("Login error:", error);
        clearAuth();
      }
    },
    [clearAuth]
  );

  // Initialize authentication on app start
  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        try {
          const userData = await fetchCurrentUser(token);
          setUser(userData.data.user);
          localStorage.setItem("user", JSON.stringify(userData.data.user));

          // Only redirect if user is on login or register pages
          const authPages = ["/login", "/register"];
          if (authPages.includes(location.pathname)) {
            navigate("/");
          }
        } catch (error) {
          console.error("Failed to initialize auth:", error);
          clearAuth();
        }
      } else {
        clearAuth();
      }

      setLoading(false);
      setIsInitialized(true);
    };

    if (!isInitialized) {
      initializeAuth();
    }
  }, [
    token,
    location.pathname,
    navigate,
    clearAuth,
    fetchCurrentUser,
    isInitialized,
  ]);

  // Token validation every 30 minutes for security
  useEffect(() => {
    if (!token || !user) return;

    const validateToken = async () => {
      try {
        await fetchCurrentUser(token);
      } catch (error) {
        console.error("Token validation failed:", error);
        logout();
      }
    };

    const interval = setInterval(validateToken, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [token, user, fetchCurrentUser, logout]);

  const contextValue = {
    user,
    token,
    login,
    logout,
    isAuthenticated,
    isAdmin,
    loading,
    isInitialized,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
