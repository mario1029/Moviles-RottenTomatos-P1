import { validationResult } from 'express-validator';
import { check } from 'express-validator';

export const signUpFieldsValidation = [
  check('alias').exists().withMessage('Es necesario un alias'),
  check('correo').exists().withMessage('Falta un correo').isEmail().withMessage('Correo invalido'),
  check('descripcion').exists().withMessage('Falta descripcion').isString().withMessage('Descripcion invalida'),
  check('contrasenia').exists().withMessage('Falta una contraseña'),
];

export const updateUserFieldsValidation = [
  check('alias').exists().withMessage('Es necesario un alias'),
  check('correo').exists().withMessage('Falta un correo').isEmail().withMessage('Correo invalido'),
  check('descripcion').exists().withMessage('Falta descripcion').isString().withMessage('Descripcion invalida'),
];

export const loginFieldsValidation = [check('correo').exists().withMessage('Falta un correo').isEmail().withMessage('Correo invalido'), check('contrasenia').exists().withMessage('Falta una contraseña')];

export const commentsValidation=[
  check('contenido').exists().withMessage('Debe incluir un comentario para su critica').isString().withMessage('Contenido invalido'),
  check('puntuacion').exists().withMessage('Debe incluir una puntuacion').isNumeric().isLength({ min: 1, max:10 }).withMessage("puntuacion invalida")]

export const checkResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      status: 400,
      message: 'Error en datos enviados',
      error: errors.array()[0],
    });
  } else {
    next();
  }
};
