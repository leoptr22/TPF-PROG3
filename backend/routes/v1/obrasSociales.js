import express from 'express';
import { check, param } from 'express-validator';
import { verifyToken } from '../../middleware/auth.js';
import { authorizeRoles } from '../../middleware/roles.js';
import { validarCampos } from '../../middleware/validarCampos.js';
import {
    crearObraSocial,
    editarObraSocial,
    eliminarObraSocial,
    listarObrasSociales
} from '../../controllers/admin/obrasSociales.controller.js';

const router = express.Router();

router.get('/', verifyToken, authorizeRoles(3), listarObrasSociales);

router.post('/', verifyToken, authorizeRoles(3), [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion debe ser texto').optional().isString(),
    check('porcentaje_descuento', 'El porcentaje_descuento debe ser numerico').optional().isFloat({ min: 0 }),
    check('es_particular', 'El es_particular debe ser booleano').optional().isBoolean()
], validarCampos, crearObraSocial);

router.put('/:id_obra_social', verifyToken, authorizeRoles(3), [
    param('id_obra_social', 'El id_obra_social debe ser numerico').isInt(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion debe ser texto').optional().isString(),
    check('porcentaje_descuento', 'El porcentaje_descuento debe ser numerico').optional().isFloat({ min: 0 }),
    check('es_particular', 'El es_particular debe ser booleano').optional().isBoolean()
], validarCampos, editarObraSocial);

router.delete('/:id_obra_social', verifyToken, authorizeRoles(3), [
    param('id_obra_social', 'El id_obra_social debe ser numerico').isInt()
], validarCampos, eliminarObraSocial);

export default router;

