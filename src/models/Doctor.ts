import { model, Schema } from "mongoose";

const doctorSchema = new Schema(
  {
    name: { type: String },
    email: { type: String },
    telephone: { type: String },
    rg: { type: String },
    cpf: { type: String },
    especialization: { type: String },
    crm: { type: String },
  },
  {
    timestamps: true,
  }
);

export const DoctorModel = model("doctors", doctorSchema);
