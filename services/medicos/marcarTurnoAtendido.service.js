const db = require('../../config/db');

const marcarTurnoAtendido = async (idTurno) => {
    const sql = `
        UPDATE turnos_reservas 
        SET atentido = 1 
        WHERE id_turno_reserva = ?
    `;

    const [result] = await db.query(sql, [idTurno]);
    return result;
};

module.exports = { marcarTurnoAtendido };