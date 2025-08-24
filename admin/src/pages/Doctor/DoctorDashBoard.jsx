import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";
import { AiOutlineClose } from "react-icons/ai";


const DoctorDashBoard = () => {
 
  const { dashData, getDashData, dToken, cancelAppointment } = useContext(DoctorContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  if (!dashData) return null;

  return (
    <div className="m-5">
      {/* Summary Cards */}
      <div className="flex flex-wrap gap-3">
        {[
          { icon: assets.earning_icon, label: "Earnings $",value: dashData.earings },
          { icon: assets.appointments_icon, label: "Appointments", value: dashData.appointments },
          { icon: assets.patients_icon, label: "Patients", value: dashData.patients },
        ].map((card, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 bg-white p-4 min-w-[180px] rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all"
          >
            <img className="w-14" src={card.icon} alt={card.label} />
            <div>
              <p className="text-xl font-semibold text-gray-600">{card.value}</p>
              <p className="text-gray-400">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Latest Bookings */}
      <div className="bg-white mt-10 rounded shadow">
        <div className="flex items-center gap-2 px-4 py-4 border-b">
          <img src={assets.list_icon} alt="List" />
          <p className="font-semibold text-gray-700">Latest Bookings</p>
        </div>

        <div className="pt-4 space-y-4 px-4">
          {dashData.latestAppointments.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-3 border rounded ${
                item.cancelled ? "bg-gray-100" : "bg-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.docData?.image || "https://via.placeholder.com/50"}
                  alt={item.docData?.name || "Doctor"}
                  className="w-12 h-12 object-cover rounded"
                />
                <div>
                  <p className="font-semibold text-gray-700">{item.docData?.name || "Unknown"}</p>
                  <p className="text-gray-500 text-sm">{`${item.slotDate} at ${item.slotTime}`}</p>
                </div>
              </div>

              <div className="mt-2 sm:mt-0">
                {item.cancelled ? (
                  <span className="text-red-500 font-semibold">Cancelled</span>
                ) : (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="text-red-500 hover:text-red-700 text-lg"
                  >
                    <AiOutlineClose />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashBoard;
