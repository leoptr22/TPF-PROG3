import express from 'express';
import { param } from 'express-validator';
import { verifyToken } from '../../middleware/auth.js';
import { authorizeRoles } from '../../middleware/roles.js';
import { validarCampos } from '../../middleware/validarCampos.js';
import { listarMedicosEspecialidad } from '../../controllers/pacientes/listarMedicosEspecialidad.js';

const router = express.Router();

router.get('/', verifyToken, authorizeRoles(2, 3), listarMedicosEspecialidad);

router.get('/especialidad/:id_especialidad', verifyToken, authorizeRoles(2, 3), [
    param('id_especialidad', 'El id_especialidad debe ser numerico').isInt()
], validarCampos, listarMedicosEspecialidad);

export default router;
