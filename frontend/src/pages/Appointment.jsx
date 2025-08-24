import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import { assets } from '../assets/assets_frontend/assets';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {
  const { doctors, currenySymbol, backendUrl, token, getDoctorData, userData } = useContext(AppContext);
  const { docId } = useParams();
  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  const [relatedDoctors, setRelatedDoctors] = useState([]);

  // Helper functions for formatting
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatTime = (timeStr) => {
    const date = new Date(`1970-01-01T${timeStr}:00`);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  // Fetch doctor info and related doctors
  useEffect(() => {
    const doc = doctors.find((doc) => doc._id === docId);
    setDocInfo(doc);

    if (doc) {
      const related = doctors.filter(
        (item) => item.speciality === doc.speciality && item._id !== doc._id
      );
      setRelatedDoctors(related);
    }
  }, [doctors, docId]);

  // Generate available slots for 7 days
  useEffect(() => {
    if (!docInfo) return;

    const slotMap = [];
    const now = new Date();

    for (let i = 0; i < 7; i++) {
      const day = new Date();
      day.setDate(now.getDate() + i);
      day.setHours(10, 0, 0, 0);

      const endTime = new Date(day);
      endTime.setHours(21, 0, 0, 0);

      const slots = [];
      const slotTimeIter = new Date(day);

      while (slotTimeIter < endTime) {
        slots.push(slotTimeIter.toTimeString().slice(0, 5)); // "HH:MM"
        slotTimeIter.setMinutes(slotTimeIter.getMinutes() + 30);
      }

      slotMap.push({
        date: day.toDateString(),
        slots,
      });
    }

    setDocSlots(slotMap);
  }, [docInfo]);

  // Book appointment
  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book appointment');
      return navigate('/login');
    }

    if (!slotTime) {
      toast.error('Please select a slot');
      return;
    }

    try {
      const selectedDate = new Date(docSlots[slotIndex].date);
      const day = selectedDate.getDate();
      const month = selectedDate.getMonth() + 1;
      const year = selectedDate.getFullYear();
      const slotDate = `${day}_${month}_${year}`;

      const body = {
        docId: docInfo._id,
        slotDate,
        slotTime,
      };

      const { data } = await axios.post(`${backendUrl}/api/user/book-appointment`, body, {
        headers: { token },
      });

      if (data.success) {
        toast.success(data.message);
        getDoctorData();
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('❌ Book appointment error:', error);
      toast.error('Something went wrong');
    }
  };

  if (!docInfo) {
    return <div className="text-center text-gray-500 mt-10">Loading doctor information...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Doctor Info Section */}
      <div className="flex flex-col md:flex-row gap-10 items-start bg-white p-6 rounded-xl shadow-md">
        <div className="w-full md:w-1/3">
          <img src={docInfo.image} alt={docInfo.name} className="w-full rounded-lg object-cover" />
        </div>

        <div className="w-full md:w-2/3 flex flex-col gap-4 text-gray-700">
          <div className="flex items-center gap-2 text-xl font-semibold">
            <p>{docInfo.name}</p>
            <img src={assets.verified_icon} alt="Verified" className="w-5 h-5" />
          </div>
          <p className="text-sm text-gray-500">{docInfo.degree} &bull; {docInfo.speciality}</p>
          <p className="text-sm text-gray-500">{docInfo.address?.line1}, {docInfo.address?.line2}</p>
          <p className="text-gray-700 font-medium">
            Appointment fee: {currenySymbol}{docInfo.fees}
          </p>
        </div>
      </div>

      {/* Available Slots Section */}
      <div className="mt-10 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Available Slots</h2>

        <div className="flex gap-4 overflow-x-auto pb-3">
          {docSlots.map((slot, idx) => (
            <button
              key={idx}
              onClick={() => setSlotIndex(idx)}
              className={`min-w-[120px] px-4 py-2 text-sm rounded-full border ${
                slotIndex === idx
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border-gray-300'
              }`}
            >
              {formatDate(slot.date)}
            </button>
          ))}
        </div>

        <div className="flex overflow-x-auto gap-3 mt-5">
          {docSlots[slotIndex]?.slots.map((time, i) => (
            <button
              key={i}
              onClick={() => setSlotTime(time)}
              className={`px-4 py-2 rounded-full border text-sm ${
                slotTime === time
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border-gray-300'
              }`}
            >
              {formatTime(time)}
            </button>
          ))}
        </div>

        {slotTime && (
          <div className="mt-6">
            <p className="text-sm text-gray-600 mb-2">
              Selected: <span className="font-semibold">{formatDate(docSlots[slotIndex].date)}</span> at{' '}
              <span className="font-semibold">{formatTime(slotTime)}</span>
            </p>
            <button
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
              onClick={bookAppointment}
            >
              Confirm Appointment
            </button>
          </div>
        )}
      </div>

      {/* Related Doctors Section */}
      {relatedDoctors.length > 0 && (
        <div className="mt-12">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Related Doctors</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {relatedDoctors.slice(0, 5).map((item, index) => (
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
        </div>
      )}
    </div>
  );
};

export default Appointment;
