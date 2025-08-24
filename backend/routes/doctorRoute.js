import express from "express";

import {
  appointmentCancel,
  appointmentComplete,
  appointmentDoctor,
  doctorDashBoard,
  DoctorList,
  doctorProfile,
  LoginDoctor,
  updateDoctorProfile,
} from "../controllers/doctorController.js";
import authDoctor from "../middlewares/authDoctor.js";
import authUser from "../middlewares/authUser.js";

const DoctorRouter = express.Router();

DoctorRouter.get("/list", DoctorList);
DoctorRouter.post("/login", LoginDoctor);
DoctorRouter.get("/appointments", authDoctor, appointmentDoctor);
DoctorRouter.post("/complete-appointment", authDoctor, appointmentComplete);
DoctorRouter.post("/cancel-appointment", authDoctor, appointmentCancel);
DoctorRouter.get("/dashboard", authDoctor, doctorDashBoard);
DoctorRouter.get("/profile", authDoctor, doctorProfile);
DoctorRouter.post("/update-profile", authDoctor, updateDoctorProfile);

export default DoctorRouter;
