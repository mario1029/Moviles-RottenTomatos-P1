import { validationResult, check } from 'express-validator';

export const signUpFieldsValidation = [
  check('cedula').exists().withMessage('Debe incluir la cedula del usuario').isInt().withMessage('Documento invalido'),
  check('nombre').exists().withMessage('Debe incluir el nombre del usuario').isString().isLength({ min: 1 }).withMessage('El nombre no puede ser vacio'),
  check('apellido').exists().withMessage('Debe incluir el apellido de usuario').isString().withMessage('Nombre de usuario invalido'),
  check('direccion').exists().withMessage('Debe incluir la direccion del usuario').isString().withMessage('Direccion invalida'),
  check('contra').exists().withMessage('Debe incluir la contraseña'),
];

export const updateUserFieldsValidation = [
  check('cedula').exists().withMessage('Debe incluir la cedula del usuario').isInt().withMessage('Documento invalido'),
  check('nombre').exists().withMessage('Debe incluir el nombre del usuario').isString().isLength({ min: 1 }).withMessage('El nombre no puede ser vacio'),
  check('apellido').exists().withMessage('Debe incluir el apellido de usuario').isString().withMessage('Nombre de usuario invalido'),
  check('direccion').exists().withMessage('Debe incluir la direccion del usuario').isString().withMessage('Direccion invalida'),
];

export const loginFieldsValidation = [
  check('cedula').exists().withMessage('Debe incluir el nombre de usuario').isString().withMessage('Nombre de usuario invalido'),
  check('contra').exists().withMessage('Debe incluir la contraseña').isString().withMessage('Contraseña invalida'),
];

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
