import { Link, NavLink } from "react-router-dom";
import Loader from "../loader";
import { useAuth } from "../../auth/authContext";
import NavbarBackground from "../navabarBackground";

const Navbar = () => {
  const activeLinkClass =
    "font-semibold text-[20px] text-secondary transition-colors underline underline-offset-[24px] decoration-4 decoration-secondary";
  const inactiveLinkClass =
    "text-white hover:text-secondary transition-colors text-[20px]";

  const { isAuthenticated, isAdmin, loading, logout, user } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return (
    <NavbarBackground>
      <div className="flex items-center gap-8">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? activeLinkClass : inactiveLinkClass
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/events"
          className={({ isActive }) =>
            isActive ? activeLinkClass : inactiveLinkClass
          }
        >
          Events
        </NavLink>
      </div>

      <div className="flex items-center gap-4">
        {isAuthenticated() ? (
          <>
            {isAdmin() && (
              <Link to="/admin">
                <button className="bg-secondary text-primary font-semibold px-4 py-2 rounded-md hover:bg-accent transition-colors">
                  Admin
                </button>
              </Link>
            )}
            <button
              onClick={logout}
              className="bg-red-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="bg-secondary text-primary font-semibold px-4 py-2 rounded-md hover:bg-accent transition-colors">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="border border-secondary text-secondary font-semibold px-4 py-2 rounded-md hover:bg-secondary hover:text-primary transition-colors">
                Register
              </button>
            </Link>
          </>
        )}
      </div>
    </NavbarBackground>
  );
};

export default Navbar;
