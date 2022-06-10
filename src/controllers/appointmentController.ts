import { Request, Response } from "express";

import { AppoModel } from "../models/Appointment";

import Logger from "../../config/logger";
import { DoctorModel } from "../models/Doctor";
import { PatientModel } from "../models/Patient";

export async function createAppointment(req: Request, res: Response) {
  try {
    const dataAppo = req.body;
    const idDoctor = req.body.doctor_id;
    const idPatient = req.body.patient_id;

    const findDoctor = await DoctorModel.findById({ _id: idDoctor })
      .then((data) => {
        if (data.length > 0) {
          return res.status(404).json({
            errors: "Doutor não encontrada no sistema",
          });
        } else {
          const findPatient = PatientModel.findById({ _id: idPatient })
            .then((data) => {
              if (data.length > 0) {
                return res.status(404).json({
                  errors: "Paciente não encontrada no sistema",
                });
              } else {
                const appointment = AppoModel.create(dataAppo);
                res.json({
                  msg: `Consulta Agendada no horário ${dataAppo.hour} no dia ${dataAppo.date}`,
                });
              }
            })
            .catch(() => {
              res.status(404).json({ error: "Paciente não encontrado" });
            });
        }
      })
      .catch(() => {
        res.status(404).json({ error: "Doutor não encontrado" });
      });
  } catch (e: any) {
    Logger.error(`Erro no sistema: ${e.message}`);
    res.status(500).json({ err: "Por favor, tente mais tarde" });
  }
}

export async function findAppointmentById(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const appointment = await AppoModel.findById(id)
      .then((data) => {
        if (data.length > 0) {
          return res.status(404).json({
            errors: "Consulta não encontrada no sistema",
          });
        } else {
          res.json({ appo: data });
        }
      })
      .catch(() => {
        return res.status(404).json({ error: "Consulta não encontrada" });
      });
  } catch (e: any) {
    Logger.error(`Erro no sistema: ${e.message}`);
    res.status(500).json({ err: "Por favor, tente mais tarde" });
  }
}

export async function findAllAppointments(req: Request, res: Response) {
  try {
    const appointments = await AppoModel.find();

    return res.status(200).json({ appos: appointments });
  } catch (e: any) {
    Logger.error(`Erro no sistema: ${e.message}`);
    res.status(500).json({ err: "Por favor, tente mais tarde " });
  }
}

export async function removeAppointment(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const appointment = await AppoModel.findByIdAndRemove(id);
    if (!appointment) {
      return res.status(404).json({ error: "Consulta não existe" });
    }
    return res.status(200).json({ msg: "Consulta removida com sucesso" });
  } catch (e: any) {
    Logger.error(`Erro no sistema: ${e.message}`);
    res.status(500).json({ err: "Por favor, tente mais tarde " });
  }
}

export async function updateAppointment(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const dataAppo = req.body;
    const appointment = await AppoModel.findById(id)
      .then(async (data) => {
        if (data.length > 0) {
          return res.status(404).json({
            errors: "Consulta não encontrado no sistema",
          });
        } else {
          await AppoModel.updateOne({ _id: id }, dataAppo);
          res
            .status(200)
            .json({ msg: "Campos da Consulta alterados com sucesso" });
        }
      })
      .catch(() => {
        return res.status(404).json({ error: "Consulta não encontrado" });
      });
  } catch (e: any) {
    Logger.error(`Erro no sistema: ${e.message}`);
    res.status(500).json({ err: "Por favor, tente mais tarde " });
  }
}
