const express = require('express');
const router = express.Router();
const { isAuth } = require('../validations/auth');
const { getUserByID } = require('../helpers/auth')
const { updateUserFieldsValidation, checkResult } = require('../validations/fields');
const {deleteUser, updateUser} = require('../helpers/users');

router.get('/:id', isAuth, async (req, res)=>{
	const data = await getUserByID(req.params.id);
	res.send({ci: data.cedula, nombre: data.nombre});
})

router.put('/:id', isAuth,  updateUserFieldsValidation, checkResult, async (req, res) => {
  const cedula = req.params.id;
  try {
    const data = await updateUser( req.body, cedula );
    res.status(200).json({ status: 200, usuario: data, message: 'Usuario actualizado!' });
  } catch (e) {
    res.status(500).json({ status: 500, error: e, message: 'Error al actualizar un usuario' });
  }
});

router.delete('/:id', isAuth, async (req, res)=>{
  const cedula = req.params.id;
  try {
    const data = await deleteUser( cedula );
    res.status(200).json({ status: 200, message: 'Usuario eliminado!' });
  } catch (e) {
    res.status(500).json({ status: 500, error: e, message: 'Error al eliminar usuario' });
  }
})

module.exports = router;