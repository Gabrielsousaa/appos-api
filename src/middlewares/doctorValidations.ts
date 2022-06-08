import { body } from "express-validator";
import {
  phoneNumber,
  cpfFormat as cpfIsValid,
  rg,
  crm,
} from "../utils/Validations";

import { cpf } from "cpf-cnpj-validator";

export const doctorCreateValidation = () => {
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
    body("especialization")
      .isString()
      .isEmpty()
      .withMessage("Campo especialização inválido"),
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
    body("crm").isString().matches(crm).withMessage("CRM inválido"),
  ];
};

/*
      .custom((value: number) => {
        if (value < 0 || value > 10) {
          throw new Error("A nota precisa ser entre 0 e 10");
        }
        return true;
      }),
      
*/
