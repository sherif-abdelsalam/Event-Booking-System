import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "../src/auth/authContext";
import RoleRoute from "../src/auth/roleRoute";
import Home from "./pages/Home";

const AdminPanel = () => <div>Admin Panel</div>;

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/admin"
            element={
              <RoleRoute>
                <AdminPanel />
              </RoleRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
