const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { authorizeRoles } = require('../middleware/roles');
const { check } = require('express-validator');
const { param } = require('express-validator');


const { listaTurnosPaciente } = require('../controllers/pacientes/listaTurnosPaciente');

const {  crearTurnoPaciente } = require('../controllers/pacientes/crearTurnoPaciente');

const { listaEspecialidadesPaciente } = require('../controllers/pacientes/listaEspecialidadesPaciente');

const { listarMedicosEspecialidad } = require('../controllers/pacientes/listarMedicosEspecialidad');

const { validarCampos } = require('../middleware/validarCampos');


const controlador = (req, res) => {
    res.json({ msg: "Ruta de paciente funcionando" });
};


// para listar los turnos del paciente
router.get('/turnos', verifyToken, authorizeRoles(2), 
[check('id_paciente', 'El id_paciente es obligatorio').not().isEmpty(),
 param('id_paciente', 'El id_paciente debe ser numérico').isInt()
], validarCampos, listaTurnosPaciente);




// para listar las especialidades del paciente

router.get('/especialidades', verifyToken, authorizeRoles(2), 
[check('id_paciente', 'El id_paciente es obligatorio').not().isEmpty(),
    param('id_paciente', 'El ID debe ser numérico y entero').isInt()
], validarCampos, listaEspecialidadesPaciente);




// para crear un turno

router.post('/crear-turnos', verifyToken,  authorizeRoles(2), [

        check('id_medico', 'El id_medico es obligatorio')
            .not()
            .isEmpty(),

        check('id_medico', 'Debe ser numérico')
            .isInt(),

        check('id_obra_social', 'La obra social es obligatoria')
            .not()
            .isEmpty(),

        check('fecha_hora', 'Fecha inválida')
            .isISO8601(),

        check('valor_total', 'Valor inválido')
            .isFloat({ min: 0 }),


       

    ],

    validarCampos ,crearTurnoPaciente);







// lista todos los medicos de una especialidad

router.get('/medicos-especialidad/:id_especialidad', verifyToken, authorizeRoles(2),

// agregar param para validar el id_especialidad

listarMedicosEspecialidad);

module.exports = router;
