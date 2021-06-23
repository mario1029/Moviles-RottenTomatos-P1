"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByID = exports.comparePassword = exports.signUpUser = void 0;
const pool_1 = __importDefault(require("../utils/pool"));
const queries_1 = require("../utils/queries");
const bcryptjs_1 = require("bcryptjs");
const pool = pool_1.default.getInstance();
const signUpUser = async function (body) {
    const client = await pool.connect();
    const { cedula, nombre, apellido, direccion, contra } = body;
    try {
        await client.query('BEGIN');
        const salt = bcryptjs_1.genSaltSync(10);
        const hashedPassword = bcryptjs_1.hashSync(contra, salt);
        const response = (await client.query(queries_1.queries.SIGN_UP_USER, [cedula, nombre.toLowerCase(), apellido.toLowerCase(), direccion, hashedPassword])).rows[0];
        const user = {
            cedula: response.cedula,
            nombre: response.nombre,
            apellido: response.apellido,
            direccion: response.direccion,
            contra: response.contra,
        };
        await client.query('COMMIT');
        return user;
    }
    catch (e) {
        await client.query('ROLLBACK');
        throw e;
    }
    finally {
        client.release();
    }
};
exports.signUpUser = signUpUser;
const comparePassword = (candidate, hash) => {
    return new Promise((res, rej) => {
        bcryptjs_1.compare(candidate, hash, (err, isMatch) => {
            if (err)
                rej(err);
            res(isMatch);
        });
    });
};
exports.comparePassword = comparePassword;
const getUserByID = async (cedula) => {
    const client = await pool.connect();
    try {
        const response = (await client.query(queries_1.queries.GET_USER_BY_ID, [cedula])).rows;
        const users = response.map((row) => {
            return {
                cedula: row.cedula,
                nombre: row.nombre,
                apellido: row.appellido,
                direccion: row.direccion,
                contra: row.contra,
            };
        });
        return users[0];
    }
    catch (e) {
        throw e;
    }
    finally {
        client.release();
    }
};
exports.getUserByID = getUserByID;
//# sourceMappingURL=session.js.map