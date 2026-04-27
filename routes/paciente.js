const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { authorizeRoles } = require('../middleware/roles');


const { listaTurnosPaciente } = require('../controllers/pacientes/listaTurnosPaciente');

const {  crearTurnoPaciente } = require('../controllers/pacientes/crearTurnoPaciente');

const { listaEspecialidadesPaciente } = require('../controllers/pacientes/listaEspecialidadesPaciente');

const { listarMedicosEspecialidad } = require('../controllers/pacientes/listarMedicosEspecialidad');


const controlador = (req, res) => {
    res.json({ msg: "Ruta de paciente funcionando" });
};


// para listar los turnos del paciente
router.get('/turnos', verifyToken, authorizeRoles(2), listaTurnosPaciente);

// para listar las especialidades del paciente

router.get('/especialidades', verifyToken, authorizeRoles(2), listaEspecialidadesPaciente);

// para crear un turno

router.post('/crear-turnos', verifyToken, authorizeRoles(2), crearTurnoPaciente);

// lista todos los medicos de una especialidad

router.get('/medicos-especialidad/:id_especialidad', verifyToken, authorizeRoles(2), listarMedicosEspecialidad);

module.exports = router;
