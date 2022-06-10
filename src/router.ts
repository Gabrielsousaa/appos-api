import { Router, Request, Response } from "express";
//controllers
import {
  createDoctor,
  findAllDoctors,
  findDoctorById,
  removeDoctor,
  updateDoctor,
} from "./controllers/doctorController";
import {
  findAllPatients,
  createPatient,
  findPatientById,
  removePatient,
  updatePatient,
} from "./controllers/patientController";

//validações
import { doctorCreateValidation } from "./middlewares/doctorValidations";
import { patientCreateValidation } from "./middlewares/patientValidations";
import { validate } from "./middlewares/handleValidation";
import { createAppointment } from "./controllers/appointmentController";
import { appoCreateValidation } from "./middlewares/appoValidatons";
const router = Router();

export default router
  .get("/test", (req: Request, res: Response) => {
    res.status(200).send("API working");
  })
  //doctor routes
  .post("/doc", doctorCreateValidation(), validate, createDoctor)
  .get("/doc/:id", findDoctorById)
  .get("/docs", findAllDoctors)
  .delete("/doc/:id", removeDoctor)
  .patch("/doc/:id", doctorCreateValidation(), validate, updateDoctor)
  //patient routes
  .get("/pats", findAllPatients)
  .post("/pat", patientCreateValidation(), validate, createPatient)
  .get("/pat/:id", findPatientById)
  .delete("/pat/:id", removePatient)
  .patch("/pat/:id", patientCreateValidation(), validate, updatePatient)
  //appointment routes
  .post("/appo", appoCreateValidation(), validate, createAppointment);
