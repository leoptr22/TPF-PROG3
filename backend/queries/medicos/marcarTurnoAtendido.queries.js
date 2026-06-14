import db from '../../config/db.js';

export const marcarTurnoAtendido = async (idTurno, idUsuarioMedico) => {
    const sql = `
        UPDATE turnos_reservas tr
        INNER JOIN medicos m ON tr.id_medico = m.id_medico
        SET tr.atendido = 1
        WHERE tr.id_turno_reserva = ?
          AND m.id_usuario = ?
          AND tr.activo = 1
    `;

    const [result] = await db.query(sql, [idTurno, idUsuarioMedico]);
    return result;
};
