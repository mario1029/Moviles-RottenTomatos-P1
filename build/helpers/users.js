"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = void 0;
const pool_1 = __importDefault(require("../utils/pool"));
const queries_1 = require("../utils/queries");
const pool = pool_1.default.getInstance();
const updateUser = async (body, id) => {
    const client = await pool.connect();
    const { cedula, nombre, apellido, direccion } = body;
    try {
        await client.query('BEGIN');
        const response = (await client.query(queries_1.queries.UPDATE_USER, [cedula, nombre.toLowerCase(), apellido.toLowerCase(), direccion, cedula])).rows[0];
        const user = {
            cedula: response.cedula,
            nombre: response.nombre,
            apellido: response.apellido,
            direccion: response.direccion,
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
const deleteUser = async (cedula) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const response = (await client.query(queries_1.queries.DELETE_USER, [cedula])).rowCount > 0;
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