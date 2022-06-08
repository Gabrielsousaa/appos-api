import { model, Schema } from "mongoose";
const appoSchema = new Schema(
  {
    description: { type: String },
    date: { type: String },
    hour: { type: String },
    finished: { type: Boolean },
    doctor_id: { type: String },
    patient_id: { type: String },
  },
  {
    timestamps: true,
  }
);

export const AppoModel = model("appointments", appoSchema);
