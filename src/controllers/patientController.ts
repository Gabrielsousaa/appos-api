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
  const id = req.params.id;
  try {
    const patient = await PatientModel.findById(id)
      .then((data) => {
        if (data.length > 0) {
          return res.status(404).json({
            errors: "Paciente não encontrado no sistema",
          });
        } else {
          res.json({ data });
        }
      })
      .catch((error) => {
        return res.status(404).json({
          errors: "Paciente não encontrado no sistema",
        });
      });
  } catch (e: any) {
    Logger.error(`Erro no sistema: ${e.message}`);
    res.status(500).json({ err: "Por favor, tente mais tarde" });
  }
}

export async function findAllPatients(req: Request, res: Response) {
  try {
    const patients = await PatientModel.find();

    return res.status(200).json({ patients: patients });
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
    return res.status(200).json({ msg: "Paciente removido" });
  } catch (e: any) {
    Logger.error(`Erro no sistema: ${e.message}`);
    res.status(500).json({ err: "Por favor, tente mais tarde " });
  }
}

export async function updatePatient(req: Request, res: Response) {
  const id = req.params.id;
  const dataPat = req.body;
  try {
    const patient = await PatientModel.findById(id)
      .then(async (data) => {
        if (data.length > 0) {
          return res.status(404).json({
            errors: "Paciente não encontrado no sistema",
          });
        } else {
          await PatientModel.updateOne({ _id: id }, dataPat);
          res
            .status(200)
            .json({ msg: "Campos do paciente alterados com sucesso" });
        }
      })
      .catch((error) => {
        return res.status(404).json({
          errors: "Paciente não encontrado no sistema",
        });
      });
  } catch (e: any) {
    Logger.error(`Erro no sistema: ${e.message}`);
    res.status(500).json({ err: "Por favor, tente mais tarde " });
  }
}
