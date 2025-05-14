import Logo from "../logo";
import { Link, NavLink } from "react-router-dom";
import Loader from "../loader";
import { useAuth } from "../../auth/authContext";

const Navbar = () => {
    const activeLinkClass =
        "font-semibold text-[20px] text-secondary transition-colors underline underline-offset-[24px] decoration-4 decoration-secondary";
    const inactiveLinkClass =
        "text-white hover:text-secondary transition-colors text-[20px]";

    const { isAuthenticated, isAdmin, loading } = useAuth();

    // useEffect(() => {
    //     const isAdmin = async () => {
    //         const token = localStorage.getItem("token");
    //         if (!token) {
    //             console.log("No token found");
    //             navigate("/login", { replace: true });
    //             return;
    //         }
    //         setLoading(true);
    //         const response = await fetch(
    //             `${process.env.REACT_APP_API_URL}/auth/isAdmin`,
    //             {
    //                 method: "GET",
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             }
    //         );
    //         if (response.ok) {
    //             const data = await response.json();
    //             setIsAdmin(data.isAdmin);
    //         } else {
    //             console.error("Failed to check admin status");
    //         }
    //     }

    //     try {
    //         isAdmin();
    //     } catch (error) {
    //         console.error("Error checking admin status:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // }, [navigate]);

    if (loading) {
        return <Loader />
    }
    return (
        <nav
            className="flex justify-between items-center px-64 py-3 bg-primary 
    shadow-sm"
        >
            <Logo logoSize={"200px"} />
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
            {isAuthenticated() && isAdmin() && (
                <Link to="/admin">
                    <button
                        className="bg-secondary text-primary font-semibold px-4 py-2 rounded-md hover:bg-accent transition-colors"
                    >
                        Admin
                    </button>
                </Link>
            )}
        </nav>
    );
};

export default Navbar;
