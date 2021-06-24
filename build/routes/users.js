"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../validations/auth");
const session_1 = require("../helpers/session");
const fields_1 = require("../validations/fields");
const users_1 = require("../helpers/users");
const router = express_1.Router();
router.get('/:correo', auth_1.isAuth, async (req, res) => {
    const data = await session_1.getUserByEmail(req.params.correo);
    res.send({ alias: data.alias, nombre: data.correo, descripcion: data.descripcion });
});
router.put('/:correo', auth_1.isAuth, fields_1.updateUserFieldsValidation, fields_1.checkResult, async (req, res) => {
    const correo = req.params.correo;
    try {
        const data = await users_1.updateUser(req.body, correo);
        res.status(200).json({ status: 200, usuario: data, message: 'Usuario actualizado!' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al actualizar un usuario' });
    }
});
router.delete('/:correo', auth_1.isAuth, async (req, res) => {
    const correo = req.params.correo;
    try {
        const data = await users_1.deleteUser(correo);
        res.status(200).json({ status: 200, message: 'Usuario eliminado!' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al eliminar usuario' });
    }
});
exports.default = router;
//# sourceMappingURL=users.js.map