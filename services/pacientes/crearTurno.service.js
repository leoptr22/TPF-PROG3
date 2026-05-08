import db from '../../config/db.js';

export const traerPacienteByUserId = async (userId) => {
    const [paciente] = await db.query(
        'SELECT id_paciente FROM pacientes WHERE id_usuario = ?',
        [userId]
    );
    return paciente;
};

export const crearTurno = async ({ id_medico, id_paciente, id_obra_social, fecha_hora, valor_total }) => {
    const sql = `
        INSERT INTO turnos_reservas 
        (id_medico, id_paciente, id_obra_social, fecha_hora, valor_total, atentido, activo) 
        VALUES (?, ?, ?, ?, ?, 0, 1)
    `;

    const [resultado] = await db.query(sql, [
        id_medico,
        id_paciente,
        id_obra_social,
        fecha_hora,
        valor_total
    ]);

    return resultado;
};