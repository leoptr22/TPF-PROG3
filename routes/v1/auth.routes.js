import express from 'express';
const router = express.Router();
import { login } from '../../controllers/auth.controller.js';

/**
 * @swagger
 * /v1/auth/login:
 *   post:
 *     summary: Iniciar sesion
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - contrasenia
 *             properties:
 *               email:
 *                 type: string
 *                 example: ferben@correo.com
 *               contrasenia:
 *                 type: string
 *                 example: "f127f4e9e4248f77eaa446ea9bff721e3e79eedf114ba6e1cfc633853ef07b4c"
 *     responses:
 *       200:
 *         description: Login exitoso
 *       400:
 *         description: Datos incompletos
 *       401:
 *         description: Credenciales invalidas
 */
router.post('/login', login);

export default router;
