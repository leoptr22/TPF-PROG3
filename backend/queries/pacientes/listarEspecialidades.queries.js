import db from '../../config/db.js';

export const getEspecialidadesPaciente = async () => {
    const sql = `
        SELECT
            e.id_especialidad,
            e.nombre AS nombre_especialidad
        FROM especialidades AS e
        WHERE e.activo = 1
        ORDER BY e.nombre ASC
    `;

    const [rows] = await db.query(sql);
    return rows;
};
