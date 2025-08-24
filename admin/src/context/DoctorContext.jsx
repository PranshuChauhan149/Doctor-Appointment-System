import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [profileData,setProfileData] = useState(false)
  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : ""
  );
  const [dashData, setDashData] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const getAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/doctor/appointments",
        {
          headers: { dToken },
        }
      );
      if (data.success) {
        console.log(data.appointments);

        setAppointments(data.appointments.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/complete-appointment",
        { appointmentId },
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/cancel-appointment",
        { appointmentId },
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/dashboard", {
        headers: { dToken },
      });
      if (data.success) {
        console.log(data.dashData);
        
        setDashData(data.dashData);
      } else {
        toast.error(data.message)
      }
    } catch (error) {
        toast.error(error.message)
    }
  };

  const getProfileData = async()=>{
    try {
      const {data} = await axios.get(backendUrl + '/api/doctor/profile',{headers:{dToken}})
      if(data.success){
        console.log(data.dashData);
        
        setProfileData(data.dashData)
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
         toast.error(error.message)
    }
  }

  const updateProfile = async (updateObj) => {
  try {
    const { data } = await axios.post(
      backendUrl + "/api/doctor/update-profile",
      updateObj,
      { headers: { dToken } }
    );

    if (data.success) {
      toast.success(data.message);
      getProfileData(); // ✅ update के बाद fresh data fetch करो
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

  const value = {
    dToken,
    setDToken,
    backendUrl,
    appointments,
    getAppointments,
    setAppointments,
    completeAppointment,
    cancelAppointment,
    dashData,
    setDashData,
    getDashData,
    profileData,
    setProfileData,
    getProfileData,updateProfile
    
  };
  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
