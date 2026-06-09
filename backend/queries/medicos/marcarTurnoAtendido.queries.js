import db from '../../config/db.js';

export const marcarTurnoAtendido = async (idTurno) => {
    const sql = `
        UPDATE turnos_reservas
        SET atentido = 1
        WHERE id_turno_reserva = ?
          AND activo = 1
    `;

    const [result] = await db.query(sql, [idTurno]);
    return result;
};
