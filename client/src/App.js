import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RoleRoute from "./auth/roleRoute";
import Home from "./pages/Home";
import { AuthProvider } from "./auth/authContext";
import ProtectedRoute from "./auth/protectRoute";

const AdminPanel = () => <div>Admin Panel</div>;

export default function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    {/* Public Routes */}

                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Protected Routes */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/home" element={<Home />} />
                        <Route
                            path="/admin"
                            element={
                                <RoleRoute>
                                    <AdminPanel />
                                </RoleRoute>
                            }
                        />
                    </Route>

                    {/* Fallback route */}
                    <Route path="*" element={<div>404 Not Found</div>} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}
