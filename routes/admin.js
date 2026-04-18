const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { authorizeRoles } = require('../middleware/roles');

const controlador = (req, res) => {
    res.json({ msg: "Ruta de admin funcionando" });
};


router.get('/administrador', verifyToken, authorizeRoles(3), controlador);

module.exports = router;