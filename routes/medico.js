const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { authorizeRoles } = require('../middleware/roles');
const { listaTurnosMedicos } = require('../controllers/listaTurnosMedicos.js');
const db = require('../config/db');




router.get('/turnos', verifyToken, authorizeRoles(1), listaTurnosMedicos);


module.exports = router;
