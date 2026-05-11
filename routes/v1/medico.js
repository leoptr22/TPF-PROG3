import express from 'express';
const router = express.Router();
import { verifyToken } from '../../middleware/auth.js';
import { authorizeRoles } from '../../middleware/roles.js';

import { listaTurnosMedicos } from '../../controllers/medicos/listaTurnosMedicos.js';
import { marcarTurnoAtendido } from '../../controllers/medicos/marcarTurnoAtendido.js';
import db from '../../config/db.js';

// ruta para listar los turnos del medico
router.get('/turnos', verifyToken, authorizeRoles(1), listaTurnosMedicos);

// ruta para marcar un turno como atendido
router.post("/atendido/:id_turno", verifyToken, authorizeRoles(1), marcarTurnoAtendido);

export default router;