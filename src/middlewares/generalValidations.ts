import { body } from "express-validator";
import { phoneNumber, cpf, rg } from "../utils/Validations";

export const movieCreateValidation = () => {
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
    body("cpf").matches(cpf).withMessage("CPF inválido"),
    body("rg").isString().matches(rg).withMessage("Rg inválido"),
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
