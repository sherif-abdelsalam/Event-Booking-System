import Logo from "./logo";

export default function NavbarBackground({ children }) {
    return (
        <nav
            className="flex justify-between items-center px-64 py-3 bg-primary 
    shadow-sm"
        >
            <Logo logoSize={"200px"} />
            {children}
        </nav>
    );
}