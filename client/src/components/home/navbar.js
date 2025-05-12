import React from "react";
import Logo from "../logo";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/authContext";

const Navbar = () => {
  const navigate = useNavigate();
  const activeLinkClass =
    "font-semibold text-[20px] text-secondary transition-colors underline underline-offset-[23px] decoration-4 decoration-secondary";
  const inactiveLinkClass =
    "text-white hover:text-secondary transition-colors text-[20px]";

  const { isAuthenticated, isAdmin, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <nav
      className="flex justify-between items-center px-64 py-3 bg-primary 
    shadow-sm"
    >
      <Logo logoSize={"200px"} />
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
          to="/about"
          className={({ isActive }) =>
            isActive ? activeLinkClass : inactiveLinkClass
          }
        >
          About
        </NavLink>
        <NavLink
          to="/events"
          className={({ isActive }) =>
            isActive ? activeLinkClass : inactiveLinkClass
          }
        >
          Events
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? activeLinkClass : inactiveLinkClass
          }
        >
          Contact
        </NavLink>
      </div>

      <div className="flex items-center gap-8">
        {isAuthenticated() && isAdmin() && (
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              isActive ? activeLinkClass : inactiveLinkClass
            }
          >
            Admin Dashboard
          </NavLink>
        )}
        {!isAuthenticated() && (
          <>
            <Link to="/login" className={inactiveLinkClass}>
              Sign In
            </Link>
            <Link
              to="/register"
              className="bg-secondary px-8 py-2 font-semibold text-primary rounded-md hover:bg-secondaryHover transition-colors"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
