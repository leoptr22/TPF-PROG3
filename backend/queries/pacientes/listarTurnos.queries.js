import db from '../../config/db.js';

export const getTurnosPaciente = async (id_usuario) => {
    const sql = `
        SELECT
            tr.id_turno_reserva,
            tr.fecha_hora,
            u_pac.apellido AS paciente_apellido,
            u_pac.nombres AS paciente_nombre,
            u_med.apellido AS medico_apellido,
            e.nombre AS especialidad,
            os.nombre AS obra_social,
            tr.valor_total,
            tr.atentido
        FROM turnos_reservas AS tr
        INNER JOIN pacientes AS p ON tr.id_paciente = p.id_paciente
        INNER JOIN usuarios AS u_pac ON p.id_usuario = u_pac.id_usuario
        INNER JOIN medicos AS m ON tr.id_medico = m.id_medico
        INNER JOIN usuarios AS u_med ON m.id_usuario = u_med.id_usuario
        INNER JOIN especialidades AS e ON m.id_especialidad = e.id_especialidad
        INNER JOIN obras_sociales AS os ON tr.id_obra_social = os.id_obra_social
        WHERE tr.activo = 1
          AND u_pac.activo = 1
          AND u_med.activo = 1
          AND e.activo = 1
          AND os.activo = 1
          AND u_pac.id_usuario = ?
        ORDER BY tr.fecha_hora DESC
    `;

    const [rows] = await db.query(sql, [id_usuario]);
    return rows;
};
