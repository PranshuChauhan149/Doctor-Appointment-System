import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  const specialities = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist"
  ];

  return (
    <div className="px-4 py-6">
      <p className="text-gray-600 mb-4">Browse through the doctors specialist.</p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filter Sidebar */}
        <div className="lg:w-1/5">
          <p className="text-gray-700 font-medium mb-3 block lg:hidden">Filter</p>
          <div className="w-full overflow-x-auto lg:overflow-visible">
            <div className="flex lg:flex-col gap-2 lg:gap-4 text-gray-600 text-sm min-w-max lg:min-w-0">
              {specialities.map((spec, i) => (
                <p
                  key={i}
                  className={`px-4 py-2 whitespace-nowrap border rounded-full cursor-pointer transition-colors duration-200 text-center text-sm ${
                    speciality === spec
                      ? "bg-[#5f6FFF] text-white border-[#5f6FFF]"
                      : "text-gray-600 border-gray-300 hover:bg-blue-50"
                  }`}
                  onClick={() =>
                    speciality === spec
                      ? navigate("/doctors")
                      : navigate(`/doctors/${spec}`)
                  }
                >
                  {spec}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Doctor Cards Section */}
        <div className="lg:w-4/5">
          {filterDoc.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">No Doctor Available</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pt-5">
              {filterDoc.map((item, index) => (
                <div
                  key={index}
                  className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-md bg-white"
                  onClick={() => navigate(`/appointments/${item._id}`)}
                >
                  <img
                    className="w-full h-44 object-cover bg-blue-50"
                    src={item.image}
                    alt={item.name}
                  />
                  <div className="p-3">
                    <div className="flex items-center gap-2 text-sm mb-1">
  {item.available ? (
    <div className="flex items-center gap-2">
      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
      <p className="text-green-500">Available</p>
    </div>
  ) : (
    <div className="flex items-center gap-2">
      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
      <p className="text-red-500">Unavailable</p>
    </div>
  )}
</div>

                    <p className="text-base font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.speciality}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
