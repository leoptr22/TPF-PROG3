import db from '../../config/db.js';

export const asociarMedicoEspecialidad = async (idMedico, idEspecialidad) => {
    const [result] = await db.query(
        `UPDATE medicos m
         INNER JOIN usuarios u ON m.id_usuario = u.id_usuario
         SET m.id_especialidad = ?
         WHERE m.id_medico = ? AND u.activo = 1`,
        [idEspecialidad, idMedico]
    );
    return result;
};

export const buscarMedicoObraSocial = async (idMedico, idObraSocial) => {
    const [rows] = await db.query(
        `SELECT id_medico_obra_social, id_medico, id_obra_social, activo
         FROM medicos_obras_sociales
         WHERE id_medico = ? AND id_obra_social = ?`,
        [idMedico, idObraSocial]
    );
    return rows[0];
};

export const activarMedicoObraSocial = async (idMedico, idObraSocial) => {
    const [result] = await db.query(
        `UPDATE medicos_obras_sociales
         SET activo = 1
         WHERE id_medico = ? AND id_obra_social = ?`,
        [idMedico, idObraSocial]
    );
    return result;
};

export const crearMedicoObraSocial = async (idMedico, idObraSocial) => {
    const [result] = await db.query(
        `INSERT INTO medicos_obras_sociales (id_medico, id_obra_social, activo)
         VALUES (?, ?, 1)`,
        [idMedico, idObraSocial]
    );
    return result;
};

export const asociarPacienteObraSocial = async (idPaciente, idObraSocial) => {
    const [result] = await db.query(
        `UPDATE pacientes p
         INNER JOIN usuarios u ON p.id_usuario = u.id_usuario
         SET p.id_obra_social = ?
         WHERE p.id_paciente = ? AND u.activo = 1`,
        [idObraSocial, idPaciente]
    );
    return result;
};
