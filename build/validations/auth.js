"use strict";
const isLogged = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.send({
            status: 304,
            response: 'Ya existe una sesión',
        });
    }
    else {
        next();
    }
};
const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.send({
            status: 400,
            response: 'Debe iniciar sesión primero',
        });
    }
};
module.exports = { isLogged, isAuth };
//# sourceMappingURL=auth.js.map