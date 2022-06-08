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
        return res.status(200).json(data);
      })
      .catch(() => {
        return res.status(404).json({ error: "Filme não encontrado" });
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
      return res.status(404).json({ error: "O filme não existe" });
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
    const data = req.body;
    const doctor = await DoctorModel.findById(id)
      .then((data) => {
        DoctorModel.updateOne({ _id: id }, data);
        return res.status(200).json(data);
      })
      .catch((err) => {
        return res.status(404).json({ error: "O filme não existe" });
      });
  } catch (e: any) {
    Logger.error(`Erro no sistema: ${e.message}`);
    res.status(500).json({ err: "Por favor, tente mais tarde " });
  }
}
