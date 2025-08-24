import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, backendUrl, loadUserProfileData, token } =
    useContext(AppContext);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: { line1: "", line2: "" },
    gender: "",
    dob: "",
  });
  const [image, setImage] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  // Load userData into formData when component mounts or updates
  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        phone: userData.phone || "",
        address: {
          line1: userData.address?.line1 || "",
          line2: userData.address?.line2 || "",
        },
        gender: userData.gender || "",
        dob: userData.dob || "",
      });
      setImage(userData.image || null);
    }
  }, [userData]);

  // Update profile data
  const updateUserProfileData = async () => {
    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("phone", formData.phone);
      form.append("gender", formData.gender);
      form.append("dob", formData.dob);

      // ✅ Corrected this line
      form.append(
        "address",
        JSON.stringify({
          line1: formData.address.line1,
          line2: formData.address.line2,
        })
      );

      if (image instanceof File) {
        form.append("image", image);
      }

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        form,
        {
          headers: { token },
        }
      );

      if (data.success) {
        toast.success("Profile updated successfully");
        await loadUserProfileData();
        setIsEdit(false);
      } else {
        console.error("Update failed:", data.message);
        toast.error(data.message || "Update failed");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Something went wrong while updating profile");
    }
  };

  const handleAddressChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [key]: value,
      },
    }));
  };

  return (
    userData && (
      <div className="p-4 max-w-xl mx-auto bg-white rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">My Profile</h2>
          <button
            onClick={() => {
              if (isEdit) updateUserProfileData();
              setIsEdit((prev) => !prev);
            }}
            className="text-blue-500 border border-blue-500 px-3 py-1 rounded"
          >
            {isEdit ? "Save" : "Edit"}
          </button>
        </div>

        {/* Profile Image */}
        <div className="mb-4">
          <img
            src={
              image instanceof File
                ? URL.createObjectURL(image)
                : image || assets.profile_pic
            }
            alt="Profile"
            className="w-24 h-24 rounded-full mb-2"
          />
          {isEdit && (
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="block mt-2"
            />
          )}
        </div>

        {/* Name */}
        <div className="mb-2">
          <label className="font-medium">Name:</label>
          {isEdit ? (
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="block border px-2 py-1 w-full"
            />
          ) : (
            <p>{formData.name}</p>
          )}
        </div>

        {/* Contact Info */}
        <hr className="my-3" />
        <div>
          <p className="font-medium">Contact Information</p>
          <div className="mb-2">
            <p>Email:</p>
            <p>{userData.email}</p>
          </div>

          <div className="mb-2">
            <p>Phone:</p>
            {isEdit ? (
              <input
                type="text"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="block border px-2 py-1 w-full"
              />
            ) : (
              <p>{formData.phone}</p>
            )}
          </div>

          {/* Address */}
          <div className="mb-2">
            <p>Address:</p>
            {isEdit ? (
              <>
                <input
                  type="text"
                  value={formData.address.line1}
                  onChange={(e) => handleAddressChange("line1", e.target.value)}
                  className="block border px-2 py-1 w-full mb-1"
                />
                <input
                  type="text"
                  value={formData.address.line2}
                  onChange={(e) => handleAddressChange("line2", e.target.value)}
                  className="block border px-2 py-1 w-full"
                />
              </>
            ) : (
              <p>
                {formData.address.line1}
                <br />
                {formData.address.line2}
              </p>
            )}
          </div>

          {/* Gender */}
          <div className="mb-2">
            <p>Gender:</p>
            {isEdit ? (
              <select
                value={formData.gender}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, gender: e.target.value }))
                }
                className="border px-2 py-1"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            ) : (
              <p>{formData.gender}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div className="mb-2">
            <p>Date of Birth:</p>
            {isEdit ? (
              <input
                type="date"
                value={formData.dob}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, dob: e.target.value }))
                }
                className="border px-2 py-1"
              />
            ) : (
              <p>{formData.dob}</p>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default MyProfile;
