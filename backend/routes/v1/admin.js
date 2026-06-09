import express from 'express';
const router = express.Router();
import { verifyToken } from '../../middleware/auth.js';
import { authorizeRoles } from '../../middleware/roles.js';

const controlador = (req, res) => {
    res.json({ msg: "Ruta de admin funcionando" });
};

router.get('/administrador', verifyToken, authorizeRoles(3), controlador);

export default router;