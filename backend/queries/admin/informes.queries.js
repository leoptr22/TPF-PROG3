import db from '../../config/db.js';

export const obtenerDatosInformeTurnos = async ({ fecha_desde = null, fecha_hasta = null }) => {
    const params = [fecha_desde, fecha_desde, fecha_hasta, fecha_hasta];

    const [resumenRows] = await db.query(
        `SELECT
            COUNT(*) AS cantidad_turnos,
            COUNT(DISTINCT tr.id_paciente) AS cantidad_pacientes,
            COUNT(DISTINCT tr.id_medico) AS cantidad_medicos,
            COUNT(DISTINCT tr.id_obra_social) AS cantidad_obras_sociales,
            SUM(CASE WHEN tr.atentido = 1 THEN 1 ELSE 0 END) AS cantidad_atendidos,
            COALESCE(SUM(tr.valor_total), 0) AS total_facturado
         FROM turnos_reservas tr
         WHERE tr.activo = 1
           AND (? IS NULL OR DATE(tr.fecha_hora) >= ?)
           AND (? IS NULL OR DATE(tr.fecha_hora) <= ?)`,
        params
    );

    const [porObraSocial] = await db.query(
        `SELECT
            os.nombre AS obra_social,
            COUNT(*) AS cantidad_turnos,
            COUNT(DISTINCT tr.id_paciente) AS cantidad_pacientes,
            COALESCE(SUM(tr.valor_total), 0) AS total_facturado
         FROM turnos_reservas tr
         INNER JOIN obras_sociales os ON tr.id_obra_social = os.id_obra_social
         WHERE tr.activo = 1
           AND os.activo = 1
           AND (? IS NULL OR DATE(tr.fecha_hora) >= ?)
           AND (? IS NULL OR DATE(tr.fecha_hora) <= ?)
         GROUP BY os.id_obra_social, os.nombre
         ORDER BY cantidad_turnos DESC`,
        params
    );

    const [turnos] = await db.query(
        `SELECT
            tr.id_turno_reserva,
            tr.fecha_hora,
            CONCAT(up.apellido, ', ', up.nombres) AS paciente,
            CONCAT(um.apellido, ', ', um.nombres) AS medico,
            os.nombre AS obra_social,
            e.nombre AS especialidad,
            tr.valor_total,
            tr.atentido
         FROM turnos_reservas tr
         INNER JOIN pacientes p ON tr.id_paciente = p.id_paciente
         INNER JOIN usuarios up ON p.id_usuario = up.id_usuario
         INNER JOIN medicos m ON tr.id_medico = m.id_medico
         INNER JOIN usuarios um ON m.id_usuario = um.id_usuario
         INNER JOIN obras_sociales os ON tr.id_obra_social = os.id_obra_social
         INNER JOIN especialidades e ON m.id_especialidad = e.id_especialidad
         WHERE tr.activo = 1
           AND up.activo = 1
           AND um.activo = 1
           AND os.activo = 1
           AND e.activo = 1
           AND (? IS NULL OR DATE(tr.fecha_hora) >= ?)
           AND (? IS NULL OR DATE(tr.fecha_hora) <= ?)
         ORDER BY tr.fecha_hora ASC`,
        params
    );

    return {
        resumen: resumenRows[0],
        por_obra_social: porObraSocial,
        turnos
    };
};
