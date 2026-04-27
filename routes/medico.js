const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { authorizeRoles } = require('../middleware/roles');

const { listaTurnosMedicos } = require('../controllers/medicos/listaTurnosMedicos.js');

const { marcarTurnoAtendido } = require('../controllers/medicos/marcarTurnoAtendido.js');
const db = require('../config/db');



// Ruta para listar los turnos del médico
router.get('/turnos', verifyToken, authorizeRoles(1), listaTurnosMedicos);

// Ruta para marcar un turno como atendido
router.post ("/atendido/:id_turno", verifyToken, authorizeRoles(1), marcarTurnoAtendido);


module.exports = router;
