import React from "react";
import { assets } from "../assets/assets_frontend/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-white text-gray-700 py-10 px-6 sm:px-10 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Logo and description */}
        <div>
          <img src={assets.logo} alt="Logo" className="w-32 mb-4" />
          <p className="text-sm text-gray-600">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-blue-600">Home</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-blue-600">About Us</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-600">Contact Us</Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-blue-600">Privacy Policy</Link>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
          <ul className="space-y-2 text-sm">
            <li>Email: support@example.com</li>
            <li>Phone: +91 9876543210</li>
          </ul>
        </div>
      </div>

      {/* Bottom section */}
      <div className="mt-10 text-center text-xs text-gray-500 border-t pt-4">
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
