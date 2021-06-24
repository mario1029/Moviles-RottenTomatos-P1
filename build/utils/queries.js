"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queries = void 0;
exports.queries = {
    GET_USERS: `SELECT * FROM usuario`,
    GET_USER_BY_ALIAS: `SELECT * FROM usuario WHERE alias = $1`,
    GET_USER_BY_EMAIL: `SELECT * FROM usuario WHERE correo = $1`,
    SIGN_UP_USER: `INSERT INTO usuario (alias, correo, descripcion, contrasenia) VALUES ($1, $2, $3, $4) RETURNING *`,
    UPDATE_USER_BY_ALIAS: `UPDATE usuario SET alias = $1, correo = $2, descripcion = $3 WHERE alias = $4 RETURNING *`,
    UPDATE_USER_BY_EMAIL: `UPDATE usuario SET alias = $1, correo = $2, descripcion = $3 WHERE correo = $4 RETURNING *`,
    DELETE_USER_BY_ALIAS: `DELETE FROM usuario WHERE alias = $1`,
    DELETE_USER_BY_EMAIL: `DELETE FROM usuario WHERE correo = $1`,
};
//# sourceMappingURL=queries.js.map