import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AiOutlineClose } from "react-icons/ai";

const AllAppointment = () => {
  const { appointments, getAllAppointment, cancelAppointment, aToken } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointment();
    }
  }, [aToken, getAllAppointment]);

  const calculateAge = (dob) => {
    if (!dob) return "-";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="w-full max-w-6xl mx-auto m-5">
      <p className="mb-5 text-xl font-semibold text-gray-700">All Appointments</p>
      <div className="bg-white border rounded text-sm overflow-x-auto">
        {/* Table Header (Desktop) */}
        <div className="hidden sm:grid grid-cols-[0.5fr_2.5fr_1fr_2fr_2fr_1fr_1fr] py-3 px-4 border-b items-center bg-gray-50 font-medium text-gray-600">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {/* Appointments */}
        {appointments &&
          appointments.map((app, index) => (
            <div
              key={app._id}
              className="flex flex-col sm:grid sm:grid-cols-[0.5fr_2.5fr_1fr_2fr_2fr_1fr_1fr] gap-2 sm:gap-0 py-3 px-4 border-b items-center"
            >
              <p className="font-medium">{index + 1}</p>

              {/* Patient with image */}
              <div className="flex items-center gap-2">
                <img
                  src={app.userData?.image || "https://via.placeholder.com/40"}
                  alt={app.userData?.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="font-medium text-gray-700">{app.userData?.name}</span>
              </div>

              <p>{calculateAge(app.userData?.dob)}</p>
              <p className="text-gray-600">{`${app.slotDate} at ${app.slotTime}`}</p>

              {/* Doctor with image */}
              <div className="flex items-center gap-2">
                <img
                  src={app.docData?.image || "https://via.placeholder.com/40"}
                  alt={app.docData?.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="font-medium text-gray-700">{app.docData?.name}</span>
              </div>

              <p>{app.amount}</p>

              {/* Actions */}
              <div>
                {app.cancelled ? (
                  <span className="text-red-500 font-semibold">Cancelled</span>
                ) : (
                  <button
                    onClick={() => cancelAppointment(app._id)}
                    className="text-red-500 hover:text-red-700 text-xl"
                  >
                    <AiOutlineClose />
                  </button>
                )}
              </div>
            </div>
          ))}

        {appointments?.length === 0 && (
          <p className="text-center py-6 text-gray-500">No appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default AllAppointment;
