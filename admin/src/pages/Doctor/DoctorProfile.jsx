import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorProfile = () => {
  const { profileData, setProfileData, getProfileData, dToken, updateProfile } =
    useContext(DoctorContext);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  useEffect(() => {
    if (profileData) {
      setFormData(profileData);
    }
  }, [profileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    console.log(formData);
    
    await updateProfile(formData);
    setIsEditing(false);
  };

  return (
    profileData && (
      <div className="w-full min-h-screen bg-gray-50 flex justify-center p-6">
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-8">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <img
              src={profileData.image}
              alt={profileData.name}
              className="w-40 h-40 rounded-full object-cover border-4 border-blue-100 shadow-md"
            />

            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800">
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleChange}
                    className="border px-3 py-1 rounded w-full"
                  />
                ) : (
                  profileData.name
                )}
              </h2>

              <p className="text-gray-600 mt-1">
                {isEditing ? (
                  <input
                    type="text"
                    name="degree"
                    value={formData.degree || ""}
                    onChange={handleChange}
                    className="border px-3 py-1 rounded w-full mb-1"
                  />
                ) : (
                  profileData.degree
                )}
                {" - "}
                {isEditing ? (
                  <input
                    type="text"
                    name="speciality"
                    value={formData.speciality || ""}
                    onChange={handleChange}
                    className="border px-3 py-1 rounded w-full"
                  />
                ) : (
                  profileData.speciality
                )}
              </p>

              <span className="inline-block mt-2 px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-full">
                {profileData.experience}
              </span>
            </div>
          </div>

          {/* About */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800">About</h3>
            {isEditing ? (
              <textarea
                name="about"
                value={formData.about || ""}
                onChange={handleChange}
                className="border px-3 py-2 rounded w-full mt-1"
              />
            ) : (
              <p className="text-gray-600 mt-1">{profileData.about}</p>
            )}
          </div>

          {/* Address */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800">Address</h3>
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="line1"
                  value={formData.address?.line1 || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  placeholder="Line 1"
                  className="border px-3 py-1 rounded w-full mb-2"
                />
                <input
                  type="text"
                  name="line2"
                  value={formData.address?.line2 || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  placeholder="Line 2"
                  className="border px-3 py-1 rounded w-full"
                />
              </>
            ) : (
              <p className="text-gray-600 mt-1">
                {profileData.address?.line1}, {profileData.address?.line2}
              </p>
            )}
          </div>

          {/* Fee */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800">Appointment Fee</h3>
            {isEditing ? (
              <input
                type="number"
                name="fees"
                value={formData.fees || ""}
                onChange={handleChange}
                className="border px-3 py-1 rounded w-full mt-1"
              />
            ) : (
              <p className="text-gray-600 mt-1">₹ {profileData.fees}</p>
            )}
          </div>

          {/* Actions */}
          <div className="mt-8 flex justify-end gap-3">
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
