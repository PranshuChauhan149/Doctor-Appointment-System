import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../contexts/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointment = () => {
  const { backendUrl, token ,getDoctorData} = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  // Fetch user appointments
  const getUserAppointment = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getDoctorData()
        getUserAppointment();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) getUserAppointment();
  }, [token]);

  // Format slotDate "30_8_2025" → "30 Aug 2025"
  const formatSlotDate = (slotDate) => {
    if (!slotDate) return "N/A";
    const [day, month, year] = slotDate.split("_").map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Format slotTime "20:30" → "08:30 PM"
  const formatSlotTime = (slotTime) => {
    if (!slotTime) return "N/A";
    const [hour, minute] = slotTime.split(":").map(Number);
    const date = new Date();
    date.setHours(hour, minute);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handlePayment = (id) => {
    alert(`Redirecting to payment for doctor ID: ${id}`);
    // TODO: implement actual payment logic
  };

  const handleCancel = (id) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      alert(`Appointment with doctor ID ${id} cancelled`);
      // TODO: call API to cancel appointment
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">My Appointments</h1>

      {appointments.length === 0 ? (
        <p className="text-gray-500">You have no upcoming appointments.</p>
      ) : (
        appointments.map((appointment) => {
          const doc = appointment?.docData || {};
          return (
            <div
              key={appointment._id}
              className="border rounded-xl p-5 mb-6 shadow-md hover:shadow-lg transition bg-white flex justify-between items-center"
            >
              {/* Left Side - Doctor Info */}
              <div className="flex items-center gap-4">
                <img
                  src={doc?.image}
                  alt={doc?.name}
                  className="w-30 h-30  object-cover shadow"
                />
                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    {doc?.name}
                  </h2>
                  <p className="text-sm text-gray-600">{doc?.speciality}</p>
                  <p className="text-sm text-gray-600">
                    {doc?.address?.line1}, {doc?.address?.line2}
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    <strong>Date:</strong>{" "}
                    {formatSlotDate(appointment.slotDate)}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Time:</strong>{" "}
                    {formatSlotTime(appointment.slotTime)}
                  </p>
                </div>
              </div>

              {/* Right Side - Action Buttons */}
              <div className="flex flex-col gap-3 min-w-[140px]">
                {!appointment.cancelled && (
                  <button
                    onClick={() => handlePayment(appointment._id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow"
                  >
                    Pay Online
                  </button>
                )}
                {!appointment.cancelled && (
                  <button
                    onClick={() => cancelAppointment(appointment._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition shadow"
                  >
                    Cancel Appointment
                  </button>
                )}
                {
                  appointment.cancelled && <button className="sm:min-w-48 border border-red-500 text-red-500 rounded  py-2">
                    Appointment cancelled
                   </button>
                }
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default MyAppointment;
