import Pool from '../utils/pool';
import { queries } from '../utils/queries';
import { compare, genSaltSync, hashSync } from 'bcryptjs';
import Usuario from '../interfaces/usuario';

const pool = Pool.getInstance();

export const signUpUser = async function (body) {
  const client = await pool.connect();
  const { cedula, nombre, apellido, direccion, contra } = body;
  try {
    await client.query('BEGIN');
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(contra, salt);
    const response = (await client.query(queries.SIGN_UP_USER, [cedula, nombre.toLowerCase(), apellido.toLowerCase(), direccion, hashedPassword])).rows[0];
    const user: Usuario = {
      cedula: response.cedula,
      nombre: response.nombre,
      apellido: response.apellido,
      direccion: response.direccion,
      contra: response.contra,
    };
    await client.query('COMMIT');
    return user;
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
};

export const comparePassword = (candidate, hash) => {
  return new Promise((res, rej) => {
    compare(candidate, hash, (err, isMatch) => {
      if (err) rej(err);
      res(isMatch);
    });
  });
};

export const getUserByID = async (cedula) => {
  const client = await pool.connect();

  try {
    const response = (await client.query(queries.GET_USER_BY_ID, [cedula])).rows;
    const users = response.map((row: any) => {
      return {
        cedula: row.cedula,
        nombre: row.nombre,
        apellido: row.appellido,
        direccion: row.direccion,
        contra: row.contra,
      };
    });

    return users[0];
  } catch (e) {
    throw e;
  } finally {
    client.release();
  }
};
