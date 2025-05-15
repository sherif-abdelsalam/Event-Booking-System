import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RoleRoute from "./auth/roleRoute";
import Home from "./pages/Home";
import { AuthProvider } from "./auth/authContext";
import ProtectedRoute from "./auth/protectRoute";
import CategoryEvents from "./pages/CategoryEvents";
import EventDetails from "./pages/EventDetails";
import AdminPanel from "./pages/Admin/adminPanel";
import BookingConfirmation from "./pages/bookingConfirmation";
import AllEvents from "./pages/allEvents";
import NotFound from "./pages/notFound";
import CreateEvents from "./pages/Admin/createEvents";

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
                        <Route path="/categories/:categoryId" element={<CategoryEvents />} />
                        <Route path="/events" element={<AllEvents />} />
                        <Route path="/events/:eventId" element={<EventDetails />} />
                        <Route path="/booking-confirmation/:eventId" element={<BookingConfirmation />} />

                        <Route element={<RoleRoute />} >
                            <Route index path="/admin" element={<AdminPanel />} />
                            <Route path="/admin/events" element={<AdminPanel />} />
                            <Route path="/admin/events/create-event" element={<CreateEvents />} />

                        </Route>
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}
