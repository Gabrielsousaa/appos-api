import { Request, Response } from "express";

import { PatientModel } from "../models/Patient";

import Logger from "../../config/logger";

export async function createPatient(req: Request, res: Response) {
  try {
    const data = req.body;
    const patient = await PatientModel.create(data);
    return res.status(201).json(patient);
  } catch (e: any) {
    Logger.error(`Erro no sistema: ${e.message}`);
    res.status(500).json({ err: "Por favor, tente mais tarde" });
  }
}

export async function findPatientById(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const patient = await PatientModel.findById(id)
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch(() => {
        return res.status(404).json({ error: "Paciente não encontrado" });
      });
  } catch (e: any) {
    Logger.error(`Erro no sistema: ${e.message}`);
    res.status(500).json({ err: "Por favor, tente mais tarde" });
  }
}

export async function findAllPatients(req: Request, res: Response) {
  try {
    const patients = await PatientModel.find();

    return res.status(200).json({ data: patients });
  } catch (e: any) {
    Logger.error(`Erro no sistema: ${e.message}`);
    res.status(500).json({ err: "Por favor, tente mais tarde " });
  }
}

export async function removePatient(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const patient = await PatientModel.findByIdAndRemove(id);
    if (!patient) {
      return res.status(404).json({ error: "O paciente não existe" });
    }
    return res.status(200).json({});
  } catch (e: any) {
    Logger.error(`Erro no sistema: ${e.message}`);
    res.status(500).json({ err: "Por favor, tente mais tarde " });
  }
}

export async function updatePatient(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const data = req.body;
    const patient = await PatientModel.findById(id)
      .then((data) => {
        PatientModel.updateOne({ _id: id }, data);
        return res.status(200).json(data);
      })
      .catch((err) => {
        return res.status(404).json({ error: "O Paciente não existe" });
      });
  } catch (e: any) {
    Logger.error(`Erro no sistema: ${e.message}`);
    res.status(500).json({ err: "Por favor, tente mais tarde " });
  }
}
