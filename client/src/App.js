import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RoleRoute from "./auth/roleRoute";
import Home from "./pages/Home";
import { AuthProvider, useAuth } from "./auth/authContext";
import { ThemeProvider } from "./contexts/themeContext";
import ProtectedRoute from "./auth/protectRoute";
import CategoryEvents from "./pages/CategoryEvents";
import EventDetails from "./pages/EventDetails";
import AdminPanel from "./pages/Admin/adminPanel";
import BookingConfirmation from "./pages/bookingConfirmation";
import AllEvents from "./pages/allEvents";
import NotFound from "./pages/notFound";
import CreateEvents from "./pages/Admin/createOrEditEvent";
import EditEvents from "./pages/Admin/editEvents";
import AdminEventDetails from "./pages/Admin/adminEventDetails";
import MyBookings from "./pages/MyBookings";
import Loader from "./components/loader";
import ErrorBoundary from "./components/ErrorBoundary";

function AppContent() {
  const { loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Public Routes - Events can be viewed without authentication */}
      <Route path="/events" element={<AllEvents />} />
      <Route path="/events/:eventId" element={<EventDetails />} />
      <Route path="/categories/:categoryId" element={<CategoryEvents />} />

      {/* Protected Routes - Require authentication */}
      <Route element={<ProtectedRoute />}>
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route
          path="/booking-confirmation/:eventId"
          element={<BookingConfirmation />}
        />

        <Route element={<RoleRoute />}>
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/events" element={<AdminPanel />} />
          <Route
            path="/admin/events/:eventId"
            element={<AdminEventDetails />}
          />
          <Route path="/admin/events/create-event" element={<CreateEvents />} />
          <Route
            path="/admin/events/edit-events/:eventId"
            element={<EditEvents />}
          />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Router>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
