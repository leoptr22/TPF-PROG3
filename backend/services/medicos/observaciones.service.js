import { agregarObservacionTurno } from '../../queries/medicos/observaciones.queries.js';

const crearError = (message, statusCode = 400) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

export const agregarObservacionTurnoMedico = async ({ id_turno, id_usuario_medico, observaciones }) => {
    if (!observaciones || !observaciones.trim()) {
        throw crearError('La observacion es obligatoria');
    }

    const result = await agregarObservacionTurno({ id_turno, id_usuario_medico, observaciones: observaciones.trim() });
    if (result.affectedRows === 0) {
        throw crearError('Turno no encontrado para el medico autenticado', 404);
    }

    return result;
};
