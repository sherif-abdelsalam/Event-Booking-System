import { Github, Globe, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import myLinks from "../constants/socialLinks";

export default function Footer() {
  return (
    <footer className="bg-primary dark:bg-gray-900 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo/Brand Section */}
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-secondary">Event Booking</h3>
            <p className="text-gray-300 dark:text-gray-400 text-sm">
              Discover amazing events near you
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 mb-4 md:mb-0">
            <Link
              to="/"
              className="text-gray-400 hover:text-secondary transition-colors"
            >
              Home
            </Link>
            <Link
              to="/events"
              className="text-gray-400 hover:text-secondary transition-colors"
            >
              Events
            </Link>
            <Link
              to="/my-bookings"
              className="text-gray-400 hover:text-secondary transition-colors"
            >
              My Bookings
            </Link>
          </div>

          {/* Social Links (Optional) */}
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a
              href={myLinks.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 dark:focus:ring-offset-gray-900 p-2"
              aria-label="Website"
            >
              <Globe size={28} className="sm:w-6 group-hover:drop-shadow-md" />
            </a>
            <a
              href={myLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 dark:focus:ring-offset-gray-900 p-2"
              aria-label="GitHub Profile"
            >
              <Github size={28} className="sm:w-6 group-hover:drop-shadow-md" />
            </a>
            <a
              href={myLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 dark:focus:ring-offset-gray-900 p-2"
              aria-label="LinkedIn Profile"
            >
              <Linkedin
                size={28}
                className="sm:w-6 group-hover:drop-shadow-md"
              />
            </a>
            <a
              href={myLinks.email}
              className="group text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 dark:focus:ring-offset-gray-900 p-2"
              aria-label="Email Contact"
            >
              <Mail size={28} className="sm:w-6 group-hover:drop-shadow-md" />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-600 dark:border-gray-700 my-6"></div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-gray-300 dark:text-gray-400 text-sm">
            © 2025 All rights reserved to{" "}
            <span className="text-secondary font-semibold">
              Sherif Abdelslam
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
