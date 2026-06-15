-- Correcciones necesarias para bases creadas con versiones anteriores.

ALTER TABLE turnos_reservas
CHANGE COLUMN IF EXISTS atentido atendido TINYINT UNSIGNED NOT NULL;

ALTER TABLE turnos_reservas
ADD COLUMN IF NOT EXISTS observaciones TEXT NULL;

DELIMITER //

DROP PROCEDURE IF EXISTS sp_estadisticas_atenciones//

CREATE PROCEDURE sp_estadisticas_atenciones(
    IN p_fecha_desde DATE,
    IN p_fecha_hasta DATE
)
BEGIN
    SELECT
        COUNT(*) AS cantidad_turnos,
        COUNT(DISTINCT tr.id_paciente) AS cantidad_pacientes,
        COUNT(DISTINCT tr.id_medico) AS cantidad_medicos,
        COUNT(DISTINCT tr.id_obra_social) AS cantidad_obras_sociales,
        SUM(CASE WHEN tr.atendido = 1 THEN 1 ELSE 0 END) AS cantidad_atendidos,
        COALESCE(SUM(tr.valor_total), 0) AS total_facturado
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
      AND (p_fecha_desde IS NULL OR DATE(tr.fecha_hora) >= p_fecha_desde)
      AND (p_fecha_hasta IS NULL OR DATE(tr.fecha_hora) <= p_fecha_hasta);

    SELECT
        os.nombre AS obra_social,
        COUNT(*) AS cantidad_turnos,
        COUNT(DISTINCT tr.id_paciente) AS cantidad_pacientes,
        SUM(CASE WHEN tr.atendido = 1 THEN 1 ELSE 0 END) AS cantidad_atendidos,
        COALESCE(SUM(tr.valor_total), 0) AS total_facturado
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
      AND (p_fecha_desde IS NULL OR DATE(tr.fecha_hora) >= p_fecha_desde)
      AND (p_fecha_hasta IS NULL OR DATE(tr.fecha_hora) <= p_fecha_hasta)
    GROUP BY os.id_obra_social, os.nombre
    ORDER BY cantidad_turnos DESC;
END//

DELIMITER ;
