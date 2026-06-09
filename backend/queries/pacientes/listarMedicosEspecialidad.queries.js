import db from '../../config/db.js';

export const getMedicosEspecialidad = async (id_especialidad = null) => {
    const filtros = ['u.activo = 1', 'e.activo = 1'];
    const params = [];

    if (id_especialidad) {
        filtros.push('m.id_especialidad = ?');
        params.push(id_especialidad);
    }

    const sql = `
        SELECT
            m.id_medico,
            u.nombres,
            u.apellido,
            e.nombre AS nombre_especialidad,
            m.valor_consulta
        FROM medicos m
        INNER JOIN especialidades e ON m.id_especialidad = e.id_especialidad
        INNER JOIN usuarios u ON m.id_usuario = u.id_usuario
        WHERE ${filtros.join(' AND ')}
        ORDER BY u.apellido ASC, u.nombres ASC
    `;

    const [rows] = await db.query(sql, params);
    return rows;
};
