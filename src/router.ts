import { Router, Request, Response } from "express";
import {
  createDoctor,
  findAllDoctors,
  findDoctorById,
  removeDoctor,
  updateDoctor,
} from "./controllers/doctorController";
import { validate } from "./middlewares/handleValidation";
import { movieCreateValidation } from "./middlewares/generalValidations";
const router = Router();

export default router
  .get("/test", (req: Request, res: Response) => {
    res.status(200).send("API working");
  })
  .post("/doctor", movieCreateValidation(), validate, createDoctor)
  .get("/doctor/:id", findDoctorById)
  .get("/doctors", findAllDoctors)
  .delete("/doctor/:id", removeDoctor)
  .patch("/doctor/:id", movieCreateValidation(), validate, updateDoctor);
