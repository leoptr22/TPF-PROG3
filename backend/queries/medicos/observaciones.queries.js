import db from '../../config/db.js';

export const agregarObservacionTurno = async ({ id_turno, id_usuario_medico, observaciones }) => {
    const [result] = await db.query(
        `UPDATE turnos_reservas tr
         INNER JOIN medicos m ON tr.id_medico = m.id_medico
         SET tr.observaciones = ?
         WHERE tr.id_turno_reserva = ?
           AND m.id_usuario = ?
           AND tr.activo = 1`,
        [observaciones, id_turno, id_usuario_medico]
    );

    return result;
};
