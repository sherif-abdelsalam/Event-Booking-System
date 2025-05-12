import { createContext, useContext, useState, useEffect } from "react";
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  console.log("AuthProvider initialized", { token, user });

  // New: Fetch user data from backend when token changes
  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        try {
          const userData = await fetchCurrentUser(token);
          setUser(userData);
          localStorage.setItem("token", token);
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

  const isAuthenticated = () => {
    return !!user; // Now based on user object rather than token
  };

  const isAdmin = () => {
    if (loading) return false; // Avoid checking role while loading
    if (!user) return false; // No user means not authenticated
    if (!user.role) return false; // Role not defined
    console.log("User role:", user.role);
    return user && user.role === "admin"; // Check user role
  };

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
