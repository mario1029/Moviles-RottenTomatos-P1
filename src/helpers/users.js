const Pool = require('../utils/pool');
const queries = require('../utils/queries')



const pool = Pool.getInstance();


const updateUser = async ( body, id )=>{
  const client = await pool.connect();
  const {cedula, nombre, apellido, direccion} = body;
  try {
    await client.query('BEGIN');
    const response = (await client.query(queries.UPDATE_USER, [cedula, nombre.toLowerCase(), apellido.toLowerCase(), direccion, cedula])).rows[0];
    const user = {
            cedula: response.cedula,
            nombre: response.nombre,
            apellido: response.apellido,
            direccion: response.direccion,
    };
    await client.query('COMMIT');
    return user;
  } catch (e) {
      client.query('ROLLBACK');
      console.log(e);
      throw e;
  } finally {
      client.release();
  }
};

const deleteUser = async (cedula) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const response = (await client.query(queries.DELETE_USER, [cedula])).rowCount > 0;
    await client.query('COMMIT');
    return response;
  } catch (e) {
      await client.query('ROLLBACK');
      throw e;
  } finally {
      client.release();
  }
};

module.exports = {deleteUser, updateUser}