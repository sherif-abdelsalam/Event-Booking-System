import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const NotFound = () => {
    const location = useLocation();

    useEffect(() => {
        console.error(
            "404 Error: User attempted to access non-existent route:",
            location.pathname
        );
    }, [location.pathname]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-blue-50">
            <div className="w-full max-w-3xl px-6 py-12 text-center">
                <div className="flex justify-center mb-8">
                    <div className="relative">
                        <div className="text-9xl font-bold text-purple-600 opacity-20">404</div>

                    </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Page not found</h1>

                <p className="text-lg text-gray-600 mb-8">
                    The page you are looking for does not exist. Please check the URL and try again.
                </p>

                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Things you can try:</h2>

                    <ul className="text-left space-y-2 mb-6">
                        <li className="flex items-start">
                            <span className="inline-block bg-purple-100 rounded-full p-1 mr-2 mt-1">
                                <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </span>
                            <span>Check if you typed the address correctly</span>
                        </li>

                        <li className="flex items-start">
                            <span className="inline-block bg-purple-100 rounded-full p-1 mr-2 mt-1">
                                <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </span>
                            <span>Browse upcoming events on our home page</span>
                        </li>


                    </ul>
                </div>

                <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row justify-center mx-24">
                    <Link
                        to="/home"
                        className="flex-1 items-center justify-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors duration-300"
                    >
                        Go to Home
                    </Link>

                    <Link
                        to="/events"
                        className="flex-1 items-center justify-center px-6 py-3 bg-white border border-purple-600 text-purple-600 font-medium rounded-lg hover:bg-purple-50 transition-colors duration-300"
                    >
                        Browse Events
                    </Link>


                </div>
            </div>
        </div>
    );
};

export default NotFound;
