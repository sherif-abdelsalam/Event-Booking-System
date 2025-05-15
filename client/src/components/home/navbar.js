import Logo from "../logo";
import { Link, NavLink } from "react-router-dom";
import Loader from "../loader";
import { useAuth } from "../../auth/authContext";
import NavbarBackground from "../navabarBackground";

const Navbar = () => {
    const activeLinkClass =
        "font-semibold text-[20px] text-secondary transition-colors underline underline-offset-[24px] decoration-4 decoration-secondary";
    const inactiveLinkClass =
        "text-white hover:text-secondary transition-colors text-[20px]";

    const { isAuthenticated, isAdmin, loading } = useAuth();

    if (loading) {
        return <Loader />
    }
    return (
        <NavbarBackground>
            <div className="flex items-center gap-8">
                <NavLink
                    to="/home"
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
            {isAuthenticated() && isAdmin() && (
                <Link to="/admin">
                    <button
                        className="bg-secondary text-primary font-semibold px-4 py-2 rounded-md hover:bg-accent transition-colors"
                    >
                        Admin
                    </button>
                </Link>
            )}
        </NavbarBackground>
    );
};

export default Navbar;
