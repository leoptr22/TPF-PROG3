import express from 'express';
const router = express.Router();
import {
    getEspecialidades,
    createEspecialidad,
    updateEspecialidad,
    deleteEspecialidad
} from '../../controllers/administrador/especialidades.gestion.js';
import { verifyToken } from '../../middleware/auth.js';
import { authorizeRoles } from '../../middleware/roles.js';

/**
 * @swagger
 * /v1/admin/especialidades:
 *   get:
 *     summary: Listar especialidades
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *   post:
 *     summary: Crear especialidad
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Cardiologia
 *     responses:
 *       201:
 *         description: Creado
 */
router.get('/especialidades', verifyToken, authorizeRoles(3), getEspecialidades);
router.post('/especialidades', verifyToken, authorizeRoles(3), createEspecialidad);

/**
 * @swagger
 * /v1/admin/especialidades/{id_especialidad}:
 *   put:
 *     summary: Editar especialidad
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_especialidad
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Pediatria
 *     responses:
 *       200:
 *         description: Actualizado
 *   delete:
 *     summary: Eliminar especialidad
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_especialidad
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Eliminado
 */
router.put('/especialidades/:id_especialidad', verifyToken, authorizeRoles(3), updateEspecialidad);
router.delete('/especialidades/:id_especialidad', verifyToken, authorizeRoles(3), deleteEspecialidad);

export default router;
