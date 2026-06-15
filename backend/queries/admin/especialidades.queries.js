import db from '../../config/db.js';

export const listarEspecialidades = async () => {
    const [rows] = await db.query(
        `SELECT id_especialidad, nombre
         FROM especialidades
         WHERE activo = 1
         ORDER BY nombre ASC`
    );
    return rows;
};

export const crearEspecialidad = async ({ nombre }) => {
    const [result] = await db.query(
        `INSERT INTO especialidades (nombre, activo)
         VALUES (?, 1)`,
        [nombre]
    );
    return result;
};

export const editarEspecialidad = async (idEspecialidad, { nombre }) => {
    const [result] = await db.query(
        `UPDATE especialidades
         SET nombre = ?
         WHERE id_especialidad = ? AND activo = 1`,
        [nombre, idEspecialidad]
    );
    return result;
};

export const eliminarEspecialidad = async (idEspecialidad) => {
    const [result] = await db.query(
        `UPDATE especialidades
         SET activo = 0
         WHERE id_especialidad = ? AND activo = 1`,
        [idEspecialidad]
    );
    return result;
};
