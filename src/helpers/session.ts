import Pool from '@utils/pool';
import { queries } from '@utils/queries';
import { compare, genSaltSync, hashSync } from 'bcryptjs';
import { UsuarioCompleto } from '@interfaces/usuario';

const pool = Pool.getInstance();

export const signUpUser = async function (body) {
  const client = await pool.connect();
  const { alias, correo, descripcion, contrasenia } = body;
  try {
    await client.query('BEGIN');
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(contrasenia, salt);
    const response = (await client.query(queries.SIGN_UP_USER, [alias, correo, descripcion, hashedPassword])).rows[0];
    const user: UsuarioCompleto = {
      alias: response.alias,
      correo: response.correo,
      descripcion: response.descripcion,
      contrasenia: response.contrasenia,
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

export const getUserByEmail = async (correo: string): Promise<UsuarioCompleto> => {
  const client = await pool.connect();

  try {
    const response = (await client.query(queries.GET_USER_BY_EMAIL, [correo])).rows;
    const users: UsuarioCompleto[] = response.map((row) => {
      return {
        alias: row.alias,
        correo: row.correo,
        descripcion: row.descripcion,
        contrasenia: row.contrasenia,
      };
    });

    return users[0];
  } catch (e) {
    throw e;
  } finally {
    client.release();
  }
};
