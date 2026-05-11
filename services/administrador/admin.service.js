import db from '../../config/db.js';

// traigo todas  las especialidades
export const getAllEspecialidades = async () => {
    const [rows] = await db.query('SELECT * FROM especialidades WHERE activo = 1');
    return rows;
};

// creo  una especialidad
export const createEspecialidad = async (nombre) => {
    const [result] = await db.query(
        'INSERT INTO especialidades (nombre, activo) VALUES (?, 1)',
        [nombre]
    );
    return result;
};

// editar una especialidad
export const updateEspecialidad = async (id_especialidad, nombre) => {
    const [result] = await db.query(
        'UPDATE especialidades SET nombre = ? WHERE id_especialidad = ? AND activo = 1',
        [nombre, id_especialidad]
    );
    return result;
};

// soft delete de una especialidad
export const deleteEspecialidad = async (id_especialidad) => {
    const [result] = await db.query(
        'UPDATE especialidades SET activo = 0 WHERE id_especialidad = ? AND activo = 1',
        [id_especialidad]
    );
    return result;
};