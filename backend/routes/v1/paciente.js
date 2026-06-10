import express from 'express';
import { check, param } from 'express-validator';
import { verifyToken } from '../../middleware/auth.js';
import { authorizeRoles } from '../../middleware/roles.js';
import { validarCampos } from '../../middleware/validarCampos.js';
import { listaTurnosPaciente } from '../../controllers/pacientes/listaTurnosPaciente.js';
import { crearTurnoPaciente } from '../../controllers/pacientes/crearTurnoPaciente.js';
import { listaEspecialidadesPaciente } from '../../controllers/pacientes/listaEspecialidadesPaciente.js';
import { listarMedicosEspecialidad } from '../../controllers/pacientes/listarMedicosEspecialidad.js';

const router = express.Router();

router.get('/turnos/:id_usuario', verifyToken, authorizeRoles(2), [
    param('id_usuario', 'El id_usuario debe ser numerico').isInt()
], validarCampos, listaTurnosPaciente);

router.get('/especialidades', verifyToken, authorizeRoles(2), listaEspecialidadesPaciente);

router.post('/crear-turnos', verifyToken, authorizeRoles(2), [
    check('id_medico', 'El id_medico es obligatorio').notEmpty(),
    check('id_medico', 'El id_medico debe ser numerico').isInt(),
    check('id_obra_social', 'La obra social es obligatoria').notEmpty(),
    check('id_obra_social', 'El id_obra_social debe ser numerico').isInt(),
    check('fecha_hora', 'Fecha invalida').isISO8601()
], validarCampos, crearTurnoPaciente);

router.get('/medicos-especialidad/:id_especialidad', verifyToken, authorizeRoles(2), [
    param('id_especialidad', 'El id_especialidad debe ser numerico').isInt()
], validarCampos, listarMedicosEspecialidad);

export default router;
