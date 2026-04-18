const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { authorizeRoles } = require('../middleware/roles');


const controlador = (req, res) => {
    res.json({ msg: "Ruta de paciente funcionando" });
};

router.get('/turnos', verifyToken, authorizeRoles(2), controlador);

module.exports = router;
