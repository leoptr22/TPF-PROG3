import { crearTurno } from '../pacientes/crearTurno.service.js';

const crearError = (message, statusCode = 400) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

export const registrarTurnoAdmin = async ({ id_paciente, id_medico, id_obra_social, fecha_hora }) => {
    if (!id_paciente || !id_medico || !id_obra_social || !fecha_hora) {
        throw crearError('id_paciente, id_medico, id_obra_social y fecha_hora son obligatorios');
    }

    return crearTurno({ id_paciente, id_medico, id_obra_social, fecha_hora });
};


