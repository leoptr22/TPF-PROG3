const db = require('../../config/db');

const getEspecialidadesPaciente = async (id_usuario) => {
    const sql =  `
        SELECT 
            e.id_especialidad,
            e.nombre AS nombre_especialidad
        FROM pacientes AS p
        INNER JOIN usuarios AS u ON p.id_usuario = u.id_usuario
        INNER JOIN turnos_reservas AS tr ON p.id_paciente = tr.id_paciente  
        INNER JOIN medicos AS m ON tr.id_medico = m.id_medico
        INNER JOIN especialidades AS e ON m.id_especialidad = e.id_especialidad
        WHERE u.id_usuario = ? AND tr.activo = 1
        GROUP BY e.id_especialidad, e.nombre
    `;

    const [rows] = await db.query(sql, [userId]);
    return rows;
};

module.exports = { getEspecialidadesPaciente };