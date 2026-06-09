DELIMITER //

DROP PROCEDURE IF EXISTS sp_estadisticas_atenciones//

CREATE PROCEDURE sp_estadisticas_atenciones(
    IN p_fecha_desde DATE,
    IN p_fecha_hasta DATE
)
BEGIN
    SELECT
        COUNT(*) AS cantidad_turnos,
        SUM(CASE WHEN tr.atentido = 1 THEN 1 ELSE 0 END) AS cantidad_atendidos,
        COUNT(DISTINCT tr.id_paciente) AS cantidad_pacientes,
        COUNT(DISTINCT tr.id_medico) AS cantidad_medicos,
        COUNT(DISTINCT tr.id_obra_social) AS cantidad_obras_sociales,
        COALESCE(SUM(tr.valor_total), 0) AS total_facturado
    FROM turnos_reservas tr
    WHERE tr.activo = 1
      AND (p_fecha_desde IS NULL OR DATE(tr.fecha_hora) >= p_fecha_desde)
      AND (p_fecha_hasta IS NULL OR DATE(tr.fecha_hora) <= p_fecha_hasta);

    SELECT
        os.nombre AS obra_social,
        COUNT(*) AS cantidad_turnos,
        SUM(CASE WHEN tr.atentido = 1 THEN 1 ELSE 0 END) AS cantidad_atendidos
    FROM turnos_reservas tr
    INNER JOIN obras_sociales os ON tr.id_obra_social = os.id_obra_social
    WHERE tr.activo = 1
      AND os.activo = 1
      AND (p_fecha_desde IS NULL OR DATE(tr.fecha_hora) >= p_fecha_desde)
      AND (p_fecha_hasta IS NULL OR DATE(tr.fecha_hora) <= p_fecha_hasta)
    GROUP BY os.id_obra_social, os.nombre
    ORDER BY cantidad_turnos DESC;
END//

DELIMITER ;

-- Funcionalidad extra: observaciones del medico sobre la atencion.
ALTER TABLE turnos_reservas
ADD COLUMN IF NOT EXISTS observaciones TEXT NULL;
