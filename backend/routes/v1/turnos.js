import express from 'express';
import { check, param } from 'express-validator';
import { verifyToken } from '../../middleware/auth.js';
import { authorizeRoles } from '../../middleware/roles.js';
import { validarCampos } from '../../middleware/validarCampos.js';
import { crearTurnoPaciente } from '../../controllers/pacientes/crearTurnoPaciente.js';
import { listaTurnosPaciente } from '../../controllers/pacientes/listaTurnosPaciente.js';
import { listaTurnosMedicos } from '../../controllers/medicos/listaTurnosMedicos.js';
import { marcarTurnoAtendido } from '../../controllers/medicos/marcarTurnoAtendido.js';
import { agregarObservacionTurno } from '../../controllers/medicos/observaciones.controller.js';

const router = express.Router();

router.post('/', verifyToken, authorizeRoles(2), [
    check('id_medico', 'El id_medico es obligatorio').not().isEmpty(),
    check('id_medico', 'Debe ser numerico').isInt(),
    check('id_obra_social', 'La obra social es obligatoria').not().isEmpty(),
    check('id_obra_social', 'Debe ser numerico').isInt(),
    check('fecha_hora', 'Fecha invalida').isISO8601(),
], validarCampos, crearTurnoPaciente);

router.get('/paciente', verifyToken, authorizeRoles(2), listaTurnosPaciente);
router.get('/medico', verifyToken, authorizeRoles(1), listaTurnosMedicos);

router.patch('/:id_turno/atendido', verifyToken, authorizeRoles(1), [
    param('id_turno', 'El id_turno debe ser numerico').isInt()
], validarCampos, marcarTurnoAtendido);

router.patch('/:id_turno/observaciones', verifyToken, authorizeRoles(1), [
    param('id_turno', 'El id_turno debe ser numerico').isInt(),
    check('observaciones', 'La observacion es obligatoria').not().isEmpty()
], validarCampos, agregarObservacionTurno);

export default router;

