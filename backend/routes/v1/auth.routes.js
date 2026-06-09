import express from 'express';
const router = express.Router();
import { login } from '../../controllers/auth.controller.js';

/**
 * @swagger
 * /v1/auth/login:
 * post:
 * summary: Iniciar sesión de usuario
 * tags: [Auth]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * email:
 * type: string
 * example: "test@correo.com"
 * contrasenia:
 * type: string
 * example: "123456"
 * responses:
 * 200:
 * description: Login exitoso
 * 401:
 * description: Credenciales inválidas
 */
router.post('/login', login);

export default router;