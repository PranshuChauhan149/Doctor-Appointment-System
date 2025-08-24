import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

// ✅ Helper function to calculate age from DOB
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

const DoctorAppointment = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-auto">
        {/* Desktop Table Header */}
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-2 py-3 px-6 border-b font-semibold bg-gray-50">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* Rows */}
        {appointments && appointments.length > 0 ? (
          appointments.map((appt, index) => (
            <div
              key={appt._id}
              className="border-b hover:bg-gray-50"
            >
              {/* Desktop Row */}
              <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-2 py-3 px-6 items-center">
                <p>{index + 1}</p>
                <div className="flex items-center gap-2">
                  <img
                    src={appt.userData?.image || "/default-avatar.png"}
                    alt="patient"
                    className="w-8 h-8 rounded-full object-cover border"
                  />
                  <span>{appt.userData?.name || "Unknown"}</span>
                </div>
                <p
                  className={`${
                    appt.payment ? "text-green-600" : "text-red-600"
                  } font-medium`}
                >
                  {appt.payment ? "Paid" : "Pending"}
                </p>
                <p>{calculateAge(appt.userData?.dob)}</p>
                <p>
                  {appt.slotDate} - {appt.slotTime}
                </p>
                <p>₹{appt.amount}</p>
                <div>
                  {appt.cancelled ? (
                    <p className="text-red-600 font-medium">Cancelled</p>
                  ) : appt.incompleted ? (
                    <p className="text-green-600 font-medium">Completed</p>
                  ) : (
                    <div className="flex gap-3">
                      <button
                        onClick={() => completeAppointment(appt._id)}
                        className="bg-green-100 rounded-full p-1 text-green-600 hover:text-green-800"
                      >
                        <AiOutlineCheck size={20} />
                      </button>
                      <button
                        onClick={() => cancelAppointment(appt._id)}
                        className="bg-red-100 rounded-full p-1 text-red-600 hover:text-red-800"
                      >
                        <AiOutlineClose size={20} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Card */}
              <div className="sm:hidden p-4 flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <img
                    src={appt.userData?.image || "/default-avatar.png"}
                    alt="patient"
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                  <div>
                    <p className="font-medium">{appt.userData?.name || "Unknown"}</p>
                    <p className="text-xs text-gray-500">Age: {calculateAge(appt.userData?.dob)}</p>
                  </div>
                </div>
                <p className="text-sm">
                  <span className="font-semibold">Date:</span> {appt.slotDate} {appt.slotTime}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Payment:</span>{" "}
                  <span
                    className={`${
                      appt.payment ? "text-green-600" : "text-red-600"
                    } font-medium`}
                  >
                    {appt.payment ? "Paid" : "Pending"}
                  </span>
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Fees:</span> ₹{appt.amount}
                </p>

                {/* Actions */}
                <div className="mt-2">
                  {appt.cancelled ? (
                    <p className="text-red-600 font-medium">Cancelled</p>
                  ) : appt.incompleted ? (
                    <p className="text-green-600 font-medium">Completed</p>
                  ) : (
                    <div className="flex gap-3">
                      <button
                        onClick={() => completeAppointment(appt._id)}
                        className="bg-green-100 rounded-full p-2 text-green-600 hover:text-green-800"
                      >
                        <AiOutlineCheck size={20} />
                      </button>
                      <button
                        onClick={() => cancelAppointment(appt._id)}
                        className="bg-red-100 rounded-full p-2 text-red-600 hover:text-red-800"
                      >
                        <AiOutlineClose size={20} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center py-10 text-gray-500">
            No appointments found
          </p>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointment;
