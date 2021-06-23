"use strict";
const Pool = require('../utils/pool');
const queries = require('../utils/queries');
const { compare, genSaltSync, hashSync } = require('bcryptjs');
const pool = Pool.getInstance();
const signUpUser = async function (body) {
    const client = await pool.connect();
    const { cedula, nombre, apellido, direccion, contra } = body;
    try {
        await client.query('BEGIN');
        const salt = genSaltSync(10);
        const hashedPassword = hashSync(contra, salt);
        const response = (await client.query(queries.SIGN_UP_USER, [cedula, nombre.toLowerCase(), apellido.toLowerCase(), direccion, hashedPassword])).rows[0];
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
const comparePassword = (candidate, hash) => {
    return new Promise((res, rej) => {
        compare(candidate, hash, (err, isMatch) => {
            if (err)
                rej(err);
            res(isMatch);
        });
    });
};
const getUserByID = async (cedula) => {
    const client = await pool.connect();
    try {
        const response = (await client.query(queries.GET_USER_BY_ID, [cedula])).rows;
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
module.exports = { signUpUser, comparePassword, getUserByID };
//# sourceMappingURL=session.js.map