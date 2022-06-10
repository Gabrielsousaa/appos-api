import { body } from "express-validator";

export const appoCreateValidation = () => {
  return [
    body("description")
      .isString()
      .withMessage("A descrição é obrigatória")
      .isLength({ min: 2 })
      .withMessage("Descrição pequena demais"),
    body("date")
      .isString()
      .withMessage("Campo data da consulta deve ser preenchido"),
    body("hour")
      .isString()
      .withMessage("Campo hora da consulta deve ser preenchido"),
    body("doctor_id").isString().withMessage("Selecione o Paciente"),
    body("patient_id")
      .isString()
      .withMessage("Selecione o Doutor responsavel pela consulta"),
  ];
};
