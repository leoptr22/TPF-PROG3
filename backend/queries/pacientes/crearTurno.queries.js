import db from '../../config/db.js';

const getExecutor = (connection) => connection || db;

export const traerPacienteByUserId = async (userId, connection = null) => {
    const executor = getExecutor(connection);
    const [paciente] = await executor.query(
        `SELECT p.id_paciente
         FROM pacientes p
         INNER JOIN usuarios u ON p.id_usuario = u.id_usuario
         WHERE p.id_usuario = ? AND u.activo = 1`,
        [userId]
    );
    return paciente;
};

export const traerPacienteActivoById = async (idPaciente, connection = null) => {
    const executor = getExecutor(connection);
    const [pacientes] = await executor.query(
        `SELECT p.id_paciente
         FROM pacientes p
         INNER JOIN usuarios u ON p.id_usuario = u.id_usuario
         WHERE p.id_paciente = ? AND u.activo = 1`,
        [idPaciente]
    );
    return pacientes[0];
};

export const traerMedicoActivoById = async (idMedico, connection = null) => {
    const executor = getExecutor(connection);
    const [medicos] = await executor.query(
        `SELECT m.id_medico, m.valor_consulta
         FROM medicos m
         INNER JOIN usuarios u ON m.id_usuario = u.id_usuario
         WHERE m.id_medico = ? AND u.activo = 1`,
        [idMedico]
    );
    return medicos[0];
};

export const traerObraSocialActivaById = async (idObraSocial, connection = null) => {
    const executor = getExecutor(connection);
    const [obrasSociales] = await executor.query(
        `SELECT id_obra_social, porcentaje_descuento, es_particular
         FROM obras_sociales
         WHERE id_obra_social = ? AND activo = 1`,
        [idObraSocial]
    );
    return obrasSociales[0];
};

export const crearTurno = async ({ id_medico, id_paciente, id_obra_social, fecha_hora, valor_total }, connection = null) => {
    const executor = getExecutor(connection);
    const sql = `
        INSERT INTO turnos_reservas
        (id_medico, id_paciente, id_obra_social, fecha_hora, valor_total, atendido, activo)
        VALUES (?, ?, ?, ?, ?, 0, 1)
    `;

    const [resultado] = await executor.query(sql, [
        id_medico,
        id_paciente,
        id_obra_social,
        fecha_hora,
        valor_total
    ]);

    return resultado;
};
