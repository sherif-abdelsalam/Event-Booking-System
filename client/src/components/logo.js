import { Link } from "react-router-dom";

export default function Logo({ logoSize }) {
    return (
        <Link to="/home">
            <img src="/assets/Logo.png" alt="Logo" width={logoSize} />
        </Link>
    );
}
