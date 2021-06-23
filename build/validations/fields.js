"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkResult = exports.loginFieldsValidation = exports.updateUserFieldsValidation = exports.signUpFieldsValidation = void 0;
const express_validator_1 = require("express-validator");
exports.signUpFieldsValidation = [
    express_validator_1.check('cedula').exists().withMessage('Debe incluir la cedula del usuario').isInt().withMessage('Documento invalido'),
    express_validator_1.check('nombre').exists().withMessage('Debe incluir el nombre del usuario').isString().isLength({ min: 1 }).withMessage('El nombre no puede ser vacio'),
    express_validator_1.check('apellido').exists().withMessage('Debe incluir el apellido de usuario').isString().withMessage('Nombre de usuario invalido'),
    express_validator_1.check('direccion').exists().withMessage('Debe incluir la direccion del usuario').isString().withMessage('Direccion invalida'),
    express_validator_1.check('contra').exists().withMessage('Debe incluir la contraseña'),
];
exports.updateUserFieldsValidation = [
    express_validator_1.check('cedula').exists().withMessage('Debe incluir la cedula del usuario').isInt().withMessage('Documento invalido'),
    express_validator_1.check('nombre').exists().withMessage('Debe incluir el nombre del usuario').isString().isLength({ min: 1 }).withMessage('El nombre no puede ser vacio'),
    express_validator_1.check('apellido').exists().withMessage('Debe incluir el apellido de usuario').isString().withMessage('Nombre de usuario invalido'),
    express_validator_1.check('direccion').exists().withMessage('Debe incluir la direccion del usuario').isString().withMessage('Direccion invalida'),
];
exports.loginFieldsValidation = [
    express_validator_1.check('cedula').exists().withMessage('Debe incluir el nombre de usuario').isString().withMessage('Nombre de usuario invalido'),
    express_validator_1.check('contra').exists().withMessage('Debe incluir la contraseña').isString().withMessage('Contraseña invalida'),
];
const checkResult = (req, res, next) => {
    const errors = express_validator_1.validationResult(req);
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
exports.checkResult = checkResult;
//# sourceMappingURL=fields.js.map