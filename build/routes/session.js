"use strict";
const express = require('express');
const router = express.Router();
const { isLogged, isAuth } = require('../validations/auth');
const { signUpUser } = require('../helpers/session');
const { passportAuth } = require('../middlewares/middlewares');
const { signUpFieldsValidation, loginFieldsValidation, checkResult } = require('../validations/fields');
router.get('/', (req, res) => {
    res.send('Aqui estan las cosas de login');
});
router.get('/logout', isAuth, (req, res) => {
    req.logout();
    res.json({ status: 200, message: 'Sesión finalizada.' });
});
router.post('/signup', async (req, res) => {
    try {
        const data = await signUpUser(req.body);
        res.status(200).json({ status: 200, usuario: data, message: 'Usuario registrado satisfactoriamente' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al registrar un usuario' });
    }
});
router.post('/user', isLogged, loginFieldsValidation, checkResult, passportAuth);
module.exports = router;
//# sourceMappingURL=session.js.map