"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = void 0;
const pool_1 = __importDefault(require("@utils/pool"));
const queries_1 = require("@utils/queries");
const pool = pool_1.default.getInstance();
const updateUser = async (body, idCorreo) => {
    const client = await pool.connect();
    const { alias, correo, descripcion } = body;
    try {
        await client.query('BEGIN');
        const response = (await client.query(queries_1.queries.UPDATE_USER_BY_EMAIL, [alias, correo, descripcion, idCorreo])).rows[0];
        const user = {
            alias: response.alias,
            correo: response.correo,
            descripcion: response.descripcion,
        };
        await client.query('COMMIT');
        return user;
    }
    catch (e) {
        client.query('ROLLBACK');
        console.log(e);
        throw e;
    }
    finally {
        client.release();
    }
};
exports.updateUser = updateUser;
const deleteUser = async (idCorreo) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const response = (await client.query(queries_1.queries.DELETE_USER_BY_EMAIL, [idCorreo])).rowCount > 0;
        await client.query('COMMIT');
        return response;
    }
    catch (e) {
        await client.query('ROLLBACK');
        throw e;
    }
    finally {
        client.release();
    }
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=users.js.map