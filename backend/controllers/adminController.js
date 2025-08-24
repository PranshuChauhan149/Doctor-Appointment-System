import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import Doctor from "../models/docotor.model.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import User from "../models/User.model.js";
export const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;

    const imageFile = req.file; // assuming multer's .single('imageFile') used

    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res.json({ success: false, message: "Missing Details" });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    const doctorData = {
      name,
      email,
      image: imageUpload.secure_url,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    };

    const newDoctor = new Doctor(doctorData);
    await newDoctor.save();

    return res.json({ success: true, message: "Doctor added" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const allDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({}).select("-password"); // ✅ correct spelling
    res.json({ success: true, doctors }); // ✅ consistent in response
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    res.json({ success: true, appointments });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const AppointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    // Mark appointment as cancelled
    appointmentData.cancelled = true;
    await appointmentData.save();

    const { docId, slotDate, slotTime } = appointmentData;

    const doctorData = await Doctor.findById(docId);
    if (doctorData && doctorData.slots_booked[slotDate]) {
      // Remove the cancelled slot
      doctorData.slots_booked[slotDate] = doctorData.slots_booked[
        slotDate
      ].filter((time) => time !== slotTime);

      // If no slots remain on that day, delete the date key
      if (doctorData.slots_booked[slotDate].length === 0) {
        delete doctorData.slots_booked[slotDate];
      }

      await doctorData.save();
    }

    return res.json({
      success: true,
      message: "Appointment cancelled successfully",
    });
  } catch (error) {
    console.log("Cancel Appointment Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const adminDashboard = async (req,res)=>{
  try {
    const doctors = await Doctor.find({})
    const users = await User.find({})
    const appointments = await appointmentModel.find({})
    const dashData = {
      doctors:doctors.length,
      appointments:appointments.length,
      patients:users.length,
      latestAppointments:appointments.reverse().slice(0,5)
    }
    res.json({success:true,dashData})
    
  } catch (error) {
     console.log("Cancel Appointment Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
}