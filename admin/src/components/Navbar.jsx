import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const logout = () => {
    // ✅ First clear tokens from state & storage
    if (aToken) {
      setAToken(null);
      localStorage.removeItem("aToken");
    }
    if (dToken) {
      setDToken(null);
      localStorage.removeItem("dToken");
    }

    // ✅ After clearing, navigate
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white shadow-sm">
      <div className="flex items-center gap-2 text-xs sm:text-sm">
        <img
          className="w-36 sm:w-40 cursor-pointer"
          src={assets.admin_logo}
          alt="Logo"
          onClick={() => navigate("/")}
        />
        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
          {aToken ? "Admin" : dToken ? "Doctor" : "Guest"}
        </p>
      </div>

      {(aToken || dToken) && (
        <button
          onClick={logout}
          className="bg-primary text-white text-sm px-6 sm:px-10 py-2 rounded-full hover:opacity-90 transition"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Navbar;
