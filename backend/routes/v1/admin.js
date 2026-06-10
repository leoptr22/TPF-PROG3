import express from 'express';
import { check, param, query } from 'express-validator';
import { verifyToken } from '../../middleware/auth.js';
import { authorizeRoles } from '../../middleware/roles.js';
import { validarCampos } from '../../middleware/validarCampos.js';
import {
    asociarMedicoEspecialidad,
    asociarMedicoObraSocial,
    asociarPacienteObraSocial
} from '../../controllers/admin/asociaciones.controller.js';
import { registrarTurno } from '../../controllers/admin/turnosAdmin.controller.js';
import { obtenerEstadisticasAtenciones } from '../../controllers/admin/estadisticas.controller.js';
import { descargarInformeTurnosPDF } from '../../controllers/admin/informes.controller.js';
import { subirArchivo } from '../../controllers/admin/uploads.controller.js';
import { upload } from '../../middleware/upload.js';

const router = express.Router();

router.get('/administrador', verifyToken, authorizeRoles(3), (req, res) => {
    res.json({ msg: 'Ruta de admin funcionando' });
});

router.put('/medicos/:id_medico/especialidad', verifyToken, authorizeRoles(3), [
    param('id_medico', 'El id_medico debe ser numerico').isInt(),
    check('id_especialidad', 'El id_especialidad es obligatorio').not().isEmpty(),
    check('id_especialidad', 'El id_especialidad debe ser numerico').isInt()
], validarCampos, asociarMedicoEspecialidad);

router.post('/medicos/:id_medico/obras-sociales', verifyToken, authorizeRoles(3), [
    param('id_medico', 'El id_medico debe ser numerico').isInt(),
    check('id_obra_social', 'El id_obra_social es obligatorio').not().isEmpty(),
    check('id_obra_social', 'El id_obra_social debe ser numerico').isInt()
], validarCampos, asociarMedicoObraSocial);

router.post('/pacientes/:id_paciente/obras-sociales', verifyToken, authorizeRoles(3), [
    param('id_paciente', 'El id_paciente debe ser numerico').isInt(),
    check('id_obra_social', 'El id_obra_social es obligatorio').not().isEmpty(),
    check('id_obra_social', 'El id_obra_social debe ser numerico').isInt()
], validarCampos, asociarPacienteObraSocial);

router.post('/turnos', verifyToken, authorizeRoles(3), [
    check('id_paciente', 'El id_paciente es obligatorio').not().isEmpty(),
    check('id_paciente', 'El id_paciente debe ser numerico').isInt(),
    check('id_medico', 'El id_medico es obligatorio').not().isEmpty(),
    check('id_medico', 'El id_medico debe ser numerico').isInt(),
    check('id_obra_social', 'El id_obra_social es obligatorio').not().isEmpty(),
    check('id_obra_social', 'El id_obra_social debe ser numerico').isInt(),
    check('fecha_hora', 'Fecha invalida').isISO8601()
], validarCampos, registrarTurno);

router.get('/estadisticas/atenciones', verifyToken, authorizeRoles(3), [
    query('fecha_desde').optional().isISO8601().withMessage('fecha_desde debe tener formato fecha'),
    query('fecha_hasta').optional().isISO8601().withMessage('fecha_hasta debe tener formato fecha')
], validarCampos, obtenerEstadisticasAtenciones);

router.get('/informes/turnos/pdf', verifyToken, authorizeRoles(3), [
    query('fecha_desde').optional().isISO8601().withMessage('fecha_desde debe tener formato fecha'),
    query('fecha_hasta').optional().isISO8601().withMessage('fecha_hasta debe tener formato fecha')
], validarCampos, descargarInformeTurnosPDF);

router.post('/uploads', verifyToken, authorizeRoles(3), upload.single('archivo'), subirArchivo);

export default router;
