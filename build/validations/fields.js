"use strict";
const { validationResult, check } = require('express-validator');
const signUpFieldsValidation = [
    check('cedula').exists().withMessage('Debe incluir la cedula del usuario').isInt().withMessage('Documento invalido'),
    check('nombre').exists().withMessage('Debe incluir el nombre del usuario').isString().isLength({ min: 1 }).withMessage('El nombre no puede ser vacio'),
    check('apellido').exists().withMessage('Debe incluir el apellido de usuario').isString().withMessage('Nombre de usuario invalido'),
    check('direccion').exists().withMessage('Debe incluir la direccion del usuario').isString().withMessage('Direccion invalida'),
    check('contra').exists().withMessage('Debe incluir la contraseña'),
];
const updateUserFieldsValidation = [
    check('cedula').exists().withMessage('Debe incluir la cedula del usuario').isInt().withMessage('Documento invalido'),
    check('nombre').exists().withMessage('Debe incluir el nombre del usuario').isString().isLength({ min: 1 }).withMessage('El nombre no puede ser vacio'),
    check('apellido').exists().withMessage('Debe incluir el apellido de usuario').isString().withMessage('Nombre de usuario invalido'),
    check('direccion').exists().withMessage('Debe incluir la direccion del usuario').isString().withMessage('Direccion invalida'),
];
const loginFieldsValidation = [
    check('cedula').exists().withMessage('Debe incluir el nombre de usuario').isString().withMessage('Nombre de usuario invalido'),
    check('contra').exists().withMessage('Debe incluir la contraseña').isString().withMessage('Contraseña invalida'),
];
const checkResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            status: 400,
            message: 'Error en datos enviados',
            error: errors.array()[0],
        });
    }
    else {
        next();
    }
};
module.exports = { signUpFieldsValidation, updateUserFieldsValidation, loginFieldsValidation, checkResult };
//# sourceMappingURL=fields.js.map