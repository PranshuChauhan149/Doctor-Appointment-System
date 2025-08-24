import React, { useState } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

const Navbar = () => {
  const {token,setToken} = useContext(AppContext)
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const logout = ()=>{
    setToken(false)
    localStorage.removeItem('token')
  }
  

  return (
    <div className="flex justify-between items-center text-sm py-4 mb-5 border-b border-b-gray-40">
      <img
        src={assets.logo}
        alt="logo"
        className="w-44 cursor-pointer"
        onClick={() => navigate("/")}
      />

      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? "text-[#5f6FFF]" : "")}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/doctors" className={({ isActive }) => (isActive ? "text-[#5f6FFF]" : "")}>
            All Doctors
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "text-[#5f6FFF]" : "")}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? "text-[#5f6FFF]" : "")}>
            Contact
          </NavLink>
        </li>
      </ul>

      {/* Profile or Login Button */}
      <div className="flex items-center gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-8 rounded-full" src={assets.profile_pic} alt="Profile" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="Dropdown" />
            <div className="absolute top-0 right-0 text-base pt-14 font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p className="hover:text-black cursor-pointer" onClick={() => navigate("/my-profile")}>
                  My Profile
                </p>
                <p className="hover:text-black cursor-pointer" onClick={() => navigate("/my-appointments")}>
                  My Appointments
                </p>
                <p className="hover:text-black cursor-pointer" onClick={logout}>
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
            onClick={() => navigate("/login")}
          >
            Create Account
          </button>
        )}

        {/* Mobile Menu Icon */}
        <img
          src={assets.menu_icon}
          className="w-6 md:hidden cursor-pointer"
          alt="Menu"
          onClick={() => setShowMenu(true)}
        />
      </div>

      {/* Mobile Menu */}
      {showMenu && (
  <div className="fixed inset-0 z-50 bg-white flex flex-col">
    <div className="flex justify-between items-center px-4 py-4 border-b">
      <img src={assets.logo} className="w-44" alt="Logo" />
      <img
        src={assets.cross_icon}
        alt="Close"
        className="w-9 cursor-pointer"
        onClick={() => setShowMenu(false)}
      />
    </div>

    <ul className="flex flex-col items-center justify-center gap-6 font-medium mt-16 text-lg">
      <li onClick={() => setShowMenu(false)}>
        <NavLink to="/" className={({ isActive }) => (isActive ? "text-[#5f6FFF]" : "")}>
          Home
        </NavLink>
      </li>
      <li onClick={() => setShowMenu(false)}>
        <NavLink to="/doctors" className={({ isActive }) => (isActive ? "text-[#5f6FFF]" : "")}>
          All Doctors
        </NavLink>
      </li>
      <li onClick={() => setShowMenu(false)}>
        <NavLink to="/about" className={({ isActive }) => (isActive ? "text-[#5f6FFF]" : "")}>
          About
        </NavLink>
      </li>
      <li onClick={() => setShowMenu(false)}>
        <NavLink to="/contact" className={({ isActive }) => (isActive ? "text-[#5f6FFF]" : "")}>
          Contact
        </NavLink>
      </li>
    </ul>
  </div>
)}

    </div>
  );
};

export default Navbar;
