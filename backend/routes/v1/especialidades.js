import express from 'express';
import { check, param } from 'express-validator';
import { verifyToken } from '../../middleware/auth.js';
import { authorizeRoles } from '../../middleware/roles.js';
import { validarCampos } from '../../middleware/validarCampos.js';
import { listaEspecialidadesPaciente } from '../../controllers/pacientes/listaEspecialidadesPaciente.js';
import {
    crearEspecialidad,
    editarEspecialidad,
    eliminarEspecialidad
} from '../../controllers/admin/especialidades.controller.js';

const router = express.Router();

router.get('/', verifyToken, authorizeRoles(2, 3), listaEspecialidadesPaciente);

router.post('/', verifyToken, authorizeRoles(3), [
    check('nombre', 'El nombre es obligatorio').not().isEmpty()
], validarCampos, crearEspecialidad);

router.put('/:id_especialidad', verifyToken, authorizeRoles(3), [
    param('id_especialidad', 'El id_especialidad debe ser numerico').isInt(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty()
], validarCampos, editarEspecialidad);

router.delete('/:id_especialidad', verifyToken, authorizeRoles(3), [
    param('id_especialidad', 'El id_especialidad debe ser numerico').isInt()
], validarCampos, eliminarEspecialidad);

export default router;
