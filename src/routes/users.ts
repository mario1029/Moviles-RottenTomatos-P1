import { Router } from 'express';
import { isAuth } from '@validations/auth';
import { getUserByEmail } from '@helpers/session';
import { updateUserFieldsValidation, checkResult } from '@validations/fields';
import { deleteUser, updateUser } from '@helpers/users';

const router = Router();

router.get('/:correo', isAuth, async (req, res) => {
  const data = await getUserByEmail(req.params.correo);
  res.send({ alias: data.alias, nombre: data.correo, descripcion: data.descripcion });
});

router.put('/:correo', isAuth, updateUserFieldsValidation, checkResult, async (req, res) => {
  const correo = req.params.correo;
  try {
    const data = await updateUser(req.body, correo);
    res.status(200).json({ status: 200, usuario: data, message: 'Usuario actualizado!' });
  } catch (e) {
    res.status(500).json({ status: 500, error: e, message: 'Error al actualizar un usuario' });
  }
});

router.delete('/:correo', isAuth, async (req, res) => {
  const correo = req.params.correo;
  try {
    const data = await deleteUser(correo);
    res.status(200).json({ status: 200, message: 'Usuario eliminado!' });
  } catch (e) {
    res.status(500).json({ status: 500, error: e, message: 'Error al eliminar usuario' });
  }
});

export default router;
