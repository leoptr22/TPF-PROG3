import { marcarTurnoAtendido as actualizarTurnoAtendido } from '../../queries/medicos/marcarTurnoAtendido.queries.js';

export const marcarTurnoAtendido = async (idTurno, idUsuarioMedico) => {
    return actualizarTurnoAtendido(idTurno, idUsuarioMedico);
};
