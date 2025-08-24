import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!docImg) {
        return toast.error("Image Not Selected");
      }
      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", fees);
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({
          line1: address1,
          line2: address2,
        })
      );

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        {
          headers: { aToken },
        }
      );
      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName("");
        setPassword("");
        setEmail("");
        setPassword("");
        setFees("");
        setAbout("");
        setDegree("");
        setAddress1("");
        setAddress2("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-xl font-semibold text-gray-700">Add Doctor</p>
      <div className="bg-white px-8 py-8 border rounded-lg shadow-md w-full max-w-4xl max-h-[85vh] overflow-y-auto">
        {/* Upload Section */}
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img
              className="w-16 h-16 object-cover bg-gray-100 border rounded-full cursor-pointer hover:opacity-80 transition"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Upload"
            />
          </label>
          <input
            type="file"
            id="doc-img"
            onChange={(e) => setDocImg(e.target.files[0])}
            hidden
            accept="image/*"
          />
          <p className="text-sm">
            <span className="font-medium">Upload doctor</span> <br /> picture
          </p>
        </div>

        {/* Main Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 text-gray-600">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <p className="mb-1 text-sm font-medium">Doctor Name</p>
              <input
                type="text"
                placeholder="Enter name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <p className="mb-1 text-sm font-medium">Doctor Email</p>
              <input
                type="email"
                placeholder="Enter email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <p className="mb-1 text-sm font-medium">Doctor Password</p>
              <input
                type="password"
                placeholder="Enter password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <p className="mb-1 text-sm font-medium">Experience</p>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
              >
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i} value={`${i + 1} Year`}>
                    {i + 1} Year
                  </option>
                ))}
              </select>
            </div>
            <div>
              <p className="mb-1 text-sm font-medium">Fees</p>
              <input
                type="number"
                placeholder="Enter fees"
                required
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Middle Column */}
          <div className="space-y-4">
            <div>
              <p className="mb-1 text-sm font-medium">Speciality</p>
              <select
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="General physician">General Physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatrician</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div>
              <p className="mb-1 text-sm font-medium">Education</p>
              <input
                type="text"
                placeholder="Enter education"
                required
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <p className="mb-1 text-sm font-medium">Address</p>
              <input
                type="text"
                placeholder="Address line 1"
                required
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                className="w-full mb-2 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                placeholder="Address line 2"
                required
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        </div>

        {/* About Doctor */}
        <div className="mt-4 space-y-4">
          <div>
            <p className="mb-1 text-sm font-medium">About Doctor</p>
            <textarea
              placeholder="Write about the doctor..."
              rows={8}
              required
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg outline-none resize-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-start mt-8">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
          >
            Add Doctor
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddDoctor;
