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
} from "./controllers/patientController";

//validações
import { doctorCreateValidation } from "./middlewares/doctorValidations";
import { patientCreateValidation } from "./middlewares/patientValidations";
import { validate } from "./middlewares/handleValidation";
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
  .post("/pat", patientCreateValidation(), validate, createPatient);
