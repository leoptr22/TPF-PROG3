import {
    activarMedicoObraSocial,
    asociarMedicoEspecialidad,
    asociarPacienteObraSocial,
    buscarMedicoObraSocial,
    crearMedicoObraSocial
} from '../../queries/admin/asociaciones.queries.js';

const crearError = (message, statusCode = 400) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

export const asociarMedicoEspecialidadAdmin = async (idMedico, idEspecialidad) => {
    const result = await asociarMedicoEspecialidad(idMedico, idEspecialidad);
    if (result.affectedRows === 0) {
        throw crearError('Medico no encontrado', 404);
    }

    return result;
};

export const asociarMedicoObraSocialAdmin = async (idMedico, idObraSocial) => {
    const existente = await buscarMedicoObraSocial(idMedico, idObraSocial);
    if (existente) {
        return activarMedicoObraSocial(idMedico, idObraSocial);
    }

    return crearMedicoObraSocial(idMedico, idObraSocial);
};

export const asociarPacienteObraSocialAdmin = async (idPaciente, idObraSocial) => {
    const result = await asociarPacienteObraSocial(idPaciente, idObraSocial);
    if (result.affectedRows === 0) {
        throw crearError('Paciente no encontrado', 404);
    }

    return result;
};


