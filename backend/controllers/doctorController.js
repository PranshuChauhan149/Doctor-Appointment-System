import appointmentModel from "../models/appointmentModel.js";
import Doctor from "../models/docotor.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const changeAvailabilty = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await Doctor.findById(docId);
    await Doctor.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.json({ success: true, message: "Availablility change" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const DoctorList = async (req, res) => {
  try {
    const doctors = await Doctor.find({}).select(["-password", "-email"]);
    res.json({ success: true, doctors });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const appointmentComplete = async (req, res) => {
  try {
    const docId = req.docId; // ✅ use req.userId (from auth middleware)
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (
      appointmentData &&
      appointmentData.docId.toString() === docId.toString()
    ) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        incompleted: true, // ✅ use same field name as frontend
      });
      return res.json({ success: true, message: "Appointment Completed" });
    } else {
      return res.json({ success: false, message: "Mark Failed" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const appointmentCancel = async (req, res) => {
  try {
    const docId = req.docId;
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      return res.json({ success: true, message: "Appointment Cancelled" });
    } else {
      return res.json({ success: false, message: "Cancelled Faild" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const LoginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.json({ success: false, message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const appointmentDoctor = async (req, res) => {
  try {
    const docId = req.docId;
    const appointments = await appointmentModel.find({ docId });
    res.json({ success: true, appointments });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const doctorDashBoard = async (req, res) => {
  try {
    const docId = req.docId;
    const appointments = await appointmentModel.find({ docId });
    let earings = 0;
    appointments.map((item) => {
      if (item.incompleted || item.payment) {
        earings += item.amount;
      }
    });
    let patients = [];
    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });
    const dashData = {
      earings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };
    res.json({ success: true, dashData });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
export const doctorProfile = async (req, res) => {
  try {
    const docId = req.docId;

    const dashData = await Doctor.findById(docId).select("-password");

    if (!dashData) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    res.json({ success: true, dashData });
  } catch (error) {
    console.log("Doctor Profile Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateDoctorProfile = async (req, res) => {
  try {
    const docId = req.docId;

    const { fees, address, available } = req.body; // corrected 'fees'

    await Doctor.findByIdAndUpdate(docId, {
      fees,
      address,
      available,
    });

    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log("Update Doctor Profile Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
