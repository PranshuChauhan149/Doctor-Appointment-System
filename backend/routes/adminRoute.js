import express from "express";
import {
  addDoctor,
  adminDashboard,
  allDoctors,
  AppointmentCancel,
  appointmentsAdmin,
  loginAdmin,
} from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";
import {
  appointmentCancel,
  changeAvailabilty,
} from "../controllers/doctorController.js";
import { cancelAppointment } from "../controllers/userController.js";

const adminRouter = express.Router();

adminRouter.post("/add-doctor", upload.single("image"), addDoctor);
adminRouter.post("/login", loginAdmin);
adminRouter.post("/all-doctors", authAdmin, allDoctors);
adminRouter.post("/change-availability", authAdmin, changeAvailabilty);
adminRouter.get("/appointments", authAdmin, appointmentsAdmin);
adminRouter.post("/cancel-appointment", authAdmin, AppointmentCancel);
adminRouter.get("/dashboard", authAdmin, adminDashboard);

export default adminRouter;
