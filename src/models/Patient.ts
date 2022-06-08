import { model, Schema } from "mongoose";

const patientSchema = new Schema(
  {
    name: { type: String },
    email: { type: String },
    telephone: { type: String },
    rg: { type: String },
    cpf: { type: String },
  },
  {
    timestamps: true,
  }
);

export const PatientModel = model("patients", patientSchema);
