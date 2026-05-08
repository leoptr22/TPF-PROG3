import db from '../../config/db.js';

export const getMedicosEspecialidad = async (id_especialidad) => {
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
            WHERE m.id_especialidad = ? AND u.activo = 1
    `;

    const [rows] = await db.query(sql, [id_especialidad]);
    return rows;
};