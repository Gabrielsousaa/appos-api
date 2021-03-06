import { body } from "express-validator";
import { phoneNumber, cpfFormat as cpfIsValid, rg } from "../utils/Validations";

import { cpf } from "cpf-cnpj-validator";

export const patientCreateValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("O Nome é obrigatório")
      .isLength({ min: 5 })
      .withMessage("O Nome precisa ter no minimo 5 caracteres"),
    body("email")
      .isEmail()
      .withMessage("Campo deve ser email exemplo: exemplo@gmail.com"),
    body("telephone")
      .isString()
      .matches(phoneNumber)
      .withMessage("o numero de telefone/celular é obrigatorio."),
    body("cpf")
      .isString()
      .matches(cpfIsValid)
      .withMessage("Formato de CPF inválido")
      .custom((value) => {
        if (cpf.isValid(value) == true) {
          return true;
        }
        return false;
      })
      .withMessage("CPF inválido"),
    body("rg").isString().matches(rg).withMessage("Rg inválido"),
  ];
};
