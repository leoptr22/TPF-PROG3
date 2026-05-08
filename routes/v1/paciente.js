import express from 'express';
const router = express.Router();
import { verifyToken } from '../../middleware/auth.js';
import { authorizeRoles } from '../../middleware/roles.js';
import { check, param } from 'express-validator';

import { listaTurnosPaciente } from '../../controllers/pacientes/listaTurnosPaciente.js';
import { crearTurnoPaciente } from '../../controllers/pacientes/crearTurnoPaciente.js';
import { listaEspecialidadesPaciente } from '../../controllers/pacientes/listaEspecialidadesPaciente.js';
import { listarMedicosEspecialidad } from '../../controllers/pacientes/listarMedicosEspecialidad.js';
import { validarCampos } from '../../middleware/validarCampos.js';

const controlador = (req, res) => {
    res.json({ msg: "Ruta de paciente funcionando" });
};

// para listar los turnos del paciente
router.get('/turnos/:id_usuario', verifyToken, authorizeRoles(2), 
[
    check('id_usuario', 'El id_usuario es obligatorio').not().isEmpty(),
    param('id_usuario', 'El id_usuario debe ser numérico').isInt()
], validarCampos, listaTurnosPaciente);

// para listar las especialidades del paciente
router.get('/especialidades', verifyToken, authorizeRoles(2), 
validarCampos, listaEspecialidadesPaciente);

// para crear un turno
router.post('/crear-turnos', verifyToken, authorizeRoles(2), [
    check('id_medico', 'El id_medico es obligatorio').not().isEmpty(),
    check('id_medico', 'Debe ser numérico').isInt(),
    check('id_obra_social', 'La obra social es obligatoria').not().isEmpty(),
    check('fecha_hora', 'Fecha inválida').isISO8601(),
    check('valor_total', 'Valor inválido').isFloat({ min: 0 }),
], validarCampos, crearTurnoPaciente);

// lista todos los medicos de una especialidad
router.get('/medicos-especialidad/:id_especialidad', verifyToken, authorizeRoles(2), 
[
    param('id_especialidad', 'El id_especialidad debe ser numérico').isInt()
], validarCampos, listarMedicosEspecialidad);

export default router;