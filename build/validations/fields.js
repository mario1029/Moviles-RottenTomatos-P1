"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkResult = exports.commentsValidation = exports.loginFieldsValidation = exports.updateUserFieldsValidation = exports.signUpFieldsValidation = void 0;
const express_validator_1 = require("express-validator");
const express_validator_2 = require("express-validator");
exports.signUpFieldsValidation = [
    express_validator_2.check('alias').exists().withMessage('Es necesario un alias'),
    express_validator_2.check('correo').exists().withMessage('Falta un correo').isEmail().withMessage('Correo invalido'),
    express_validator_2.check('descripcion').exists().withMessage('Falta descripcion').isString().withMessage('Descripcion invalida'),
    express_validator_2.check('contrasenia').exists().withMessage('Falta una contraseña'),
];
exports.updateUserFieldsValidation = [
    express_validator_2.check('alias').exists().withMessage('Es necesario un alias'),
    express_validator_2.check('correo').exists().withMessage('Falta un correo').isEmail().withMessage('Correo invalido'),
    express_validator_2.check('descripcion').exists().withMessage('Falta descripcion').isString().withMessage('Descripcion invalida'),
];
exports.loginFieldsValidation = [express_validator_2.check('correo').exists().withMessage('Falta un correo').isEmail().withMessage('Correo invalido'), express_validator_2.check('contrasenia').exists().withMessage('Falta una contraseña')];
exports.commentsValidation = [
    express_validator_2.check('contenido').exists().withMessage('Debe incluir un comentario para su critica').isString().withMessage('Contenido invalido'),
    express_validator_2.check('puntuacion').exists().withMessage('Debe incluir una puntuacion').isNumeric().withMessage("puntuacion invalida")
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