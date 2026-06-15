import db from '../../config/db.js';

export const listarObrasSociales = async () => {
    const [rows] = await db.query(
        `SELECT id_obra_social, nombre, descripcion, porcentaje_descuento, es_particular
         FROM obras_sociales
         WHERE activo = 1
         ORDER BY nombre ASC`
    );
    return rows;
};

export const crearObraSocial = async ({ nombre, descripcion = '', porcentaje_descuento = 0, es_particular = 0 }) => {
    const [result] = await db.query(
        `INSERT INTO obras_sociales (nombre, descripcion, porcentaje_descuento, es_particular, activo)
         VALUES (?, ?, ?, ?, 1)`,
        [nombre, descripcion, porcentaje_descuento, es_particular]
    );
    return result;
};

export const editarObraSocial = async (idObraSocial, { nombre, descripcion = '', porcentaje_descuento = 0, es_particular = 0 }) => {
    const [result] = await db.query(
        `UPDATE obras_sociales
         SET nombre = ?, descripcion = ?, porcentaje_descuento = ?, es_particular = ?
         WHERE id_obra_social = ? AND activo = 1`,
        [nombre, descripcion, porcentaje_descuento, es_particular, idObraSocial]
    );
    return result;
};

export const eliminarObraSocial = async (idObraSocial) => {
    const [result] = await db.query(
        `UPDATE obras_sociales
         SET activo = 0
         WHERE id_obra_social = ? AND activo = 1`,
        [idObraSocial]
    );
    return result;
};
