"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../validations/auth");
const session_1 = require("../helpers/session");
const fields_1 = require("../validations/fields");
const users_1 = require("../helpers/users");
const router = express_1.Router();
router.get('/:id', auth_1.isAuth, async (req, res) => {
    const data = await session_1.getUserByID(req.params.id);
    res.send({ ci: data.cedula, nombre: data.nombre });
});
router.put('/:id', auth_1.isAuth, fields_1.updateUserFieldsValidation, fields_1.checkResult, async (req, res) => {
    const cedula = req.params.id;
    try {
        const data = await users_1.updateUser(req.body, cedula);
        res.status(200).json({ status: 200, usuario: data, message: 'Usuario actualizado!' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al actualizar un usuario' });
    }
});
router.delete('/:id', auth_1.isAuth, async (req, res) => {
    const cedula = req.params.id;
    try {
        const data = await users_1.deleteUser(cedula);
        res.status(200).json({ status: 200, message: 'Usuario eliminado!' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al eliminar usuario' });
    }
});
exports.default = router;
//# sourceMappingURL=users.js.map