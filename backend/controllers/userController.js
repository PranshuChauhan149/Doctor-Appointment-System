import validator from "validator";
import bcrypt from "bcrypt";
import User from "../models/User.model.js";
import razorpay from "razorpay";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import Doctor from "../models/docotor.model.js";
import appointmentModel from "../models/appointmentModel.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing details" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid Email" });
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "Enter strong Password" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userData = {
      name,
      email,
      password: hashedPassword,
    };
    const newUser = new User(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User does not exists" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Invalid credintails" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const userData = await User.findById(userId).select("-password");
    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    // Validate required fields
    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }

    // Update base profile fields
    await User.findByIdAndUpdate(userId, {
      name,
      phone,
      address: address ? JSON.parse(address) : {}, // Parse only if provided
      dob,
      gender,
    });

    // If image uploaded, send to Cloudinary
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageUrl = imageUpload.secure_url;

      await User.findByIdAndUpdate(userId, { image: imageUrl });
    }

    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log("Update profile error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const bookAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    const { docId, slotDate, slotTime } = req.body;

    const docData = await Doctor.findById(docId).select("-password");
    if (!docData) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    if (!docData.available) {
      return res.json({ success: false, message: "Doctor not available" });
    }

    // ✅ handle slots_booked as array of objects
    let slots_booked = docData.slots_booked || [];

    // find if this date already exists
    let dateObj = slots_booked.find((obj) => obj[slotDate]);

    if (dateObj) {
      // if time already booked
      if (dateObj[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot not available" });
      } else {
        dateObj[slotDate].push(slotTime); // push new slot time
      }
    } else {
      // create new date entry
      let newDateObj = {};
      newDateObj[slotDate] = [slotTime];
      slots_booked.push(newDateObj);
    }

    docData.slots_booked = slots_booked;
    await docData.save();

    const userData = await User.findById(userId).select("-password");

    // appointment data
    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    res.json({ success: true, message: "Appointment Booked" });
  } catch (error) {
    console.log("Book Appointment Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const listAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    const appointments = await appointmentModel.find({ userId });

    res.json({ success: true, appointments });
  } catch (error) {
    console.log("Book Appointment Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const cancelAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    if (appointmentData.userId.toString() !== userId) {
      return res.json({ success: false, message: "Unauthorized action" });
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
