import { Router, Request, Response } from "express";
import {
  createDoctor,
  findAllDoctors,
  findDoctorById,
  removeDoctor,
  updateDoctor,
} from "./controllers/doctorController";
import { validate } from "./middlewares/handleValidation";
import { doctorCreateValidation } from "./middlewares/doctorValidations";
const router = Router();

export default router
  .get("/test", (req: Request, res: Response) => {
    res.status(200).send("API working");
  })
  .post("/doctor", doctorCreateValidation(), validate, createDoctor)
  .get("/doctor/:id", findDoctorById)
  .get("/doctors", findAllDoctors)
  .delete("/doctor/:id", removeDoctor)
  .patch("/doctor/:id", doctorCreateValidation(), validate, updateDoctor);
