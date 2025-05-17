import { NavLink } from "react-router-dom";
import NavbarBackground from "../navabarBackground";

export default function AdminNavbar() {
    const activeLinkClass =
        "font-semibold text-[20px] text-secondary transition-colors underline underline-offset-[24px] decoration-4 decoration-secondary";
    const inactiveLinkClass =
        "text-white hover:text-secondary transition-colors text-[20px]";

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
                    to="/admin/events"
                    className={({ isActive }) =>
                        isActive ? activeLinkClass : inactiveLinkClass
                    }
                >
                    Events
                </NavLink>
            </div>

        </NavbarBackground>
    );
}