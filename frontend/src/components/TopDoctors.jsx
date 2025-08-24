import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';

const TopDoctors = () => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm text-gray-600">
        Simply browse through our extensive list of trusted doctors.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pt-5">
              {doctors.slice(0,10).map((item, index) => (
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
                    <div className="flex items-center gap-2 text-sm text-green-500 mb-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <p>Available</p>
                    </div>
                    <p className="text-base font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.speciality}</p>
                  </div>
                </div>
              ))}
            </div>

      <button
        className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10"
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
      >
        More
      </button>
    </div>
  );
};

export default TopDoctors;
