import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="m-5 w-[80%] max-h-[90vh] overflow-y-auto">
      <h1 className="text-lg font-medium">All Doctors</h1>
      <div className="w-full flex flex-wrap gap-6 pt-5">
        {doctors &&
          doctors.map((item, index) => (
            <div
              className="group border border-indigo-200 rounded-xl w-56 overflow-hidden cursor-pointer hover:shadow-md transition"
              key={index}
            >
              <img
                className="w-full h-40 object-cover bg-indigo-50 group-hover:bg-primary transition-colors duration-300"
                src={item.image}
                alt={item.name}
              />
              <div className="p-4">
                <p className="text-neutral-800 text-lg font-medium transition-colors duration-300">
                  {item.name}
                </p>
                <p className="text-zinc-600 text-sm">{item.speciality}</p>
                <div className="mt-2 flex items-center gap-2 text-sm">
                 <input onChange={()=>changeAvailability(item._id)} 
  type="checkbox"
  checked={item.available}
  readOnly
  className={item.available ? "accent-primary" : "accent-red-500"}
/>
<p className={item.available ? "text-green-600" : "text-red-600"}>
  {item.available ? "Available" : "Not Available"}
</p>

                  
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DoctorList;
