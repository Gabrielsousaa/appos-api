import { Request, Response } from "express";

import { DoctorModel } from "../models/Doctor";

import Logger from "../../config/logger";

export async function createDoctor(req: Request, res: Response) {
  try {
    const data = req.body;
    const doctor = await DoctorModel.create(data);
    return res.status(201).json(doctor);
  } catch (e: any) {
    Logger.error(`Erro no sistema: ${e.message}`);
    res.status(500).json({ err: "Por favor, tente mais tarde" });
  }
}

export async function findDoctorById(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const doctor = await DoctorModel.findById(id)
      .then((data) => {
        if (data.length > 0) {
          return res.status(404).json({
            errors: "Doutor não encontrado no sistema",
          });
        } else {
          res.json({ Doutor: data });
        }
      })
      .catch(() => {
        return res.status(404).json({ error: "Doutor não encontrado" });
      });
  } catch (e: any) {
    Logger.error(`Erro no sistema: ${e.message}`);
    res.status(500).json({ err: "Por favor, tente mais tarde" });
  }
}

export async function findAllDoctors(req: Request, res: Response) {
  try {
    const doctors = await DoctorModel.find();

    return res.status(200).json({ data: doctors });
  } catch (e: any) {
    Logger.error(`Erro no sistema: ${e.message}`);
    res.status(500).json({ err: "Por favor, tente mais tarde " });
  }
}

export async function removeDoctor(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const doctor = await DoctorModel.findByIdAndRemove(id);
    if (!doctor) {
      return res.status(404).json({ error: "O Doutor não existe" });
    }
    return res.status(200).json({});
  } catch (e: any) {
    Logger.error(`Erro no sistema: ${e.message}`);
    res.status(500).json({ err: "Por favor, tente mais tarde " });
  }
}

export async function updateDoctor(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const dataDoc = req.body;
    const doctor = await DoctorModel.findById(id)
      .then(async (data) => {
        if (data.length > 0) {
          return res.status(404).json({
            errors: "Doutor não encontrado no sistema",
          });
        } else {
          await DoctorModel.updateOne({ _id: id }, dataDoc);
          res
            .status(200)
            .json({ msg: "Campos do Doutor   alterados com sucesso" });
        }
      })
      .catch(() => {
        return res.status(404).json({ error: "Doutor não encontrado" });
      });
  } catch (e: any) {
    Logger.error(`Erro no sistema: ${e.message}`);
    res.status(500).json({ err: "Por favor, tente mais tarde " });
  }
}
