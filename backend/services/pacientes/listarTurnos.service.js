import { getTurnosPaciente as consultarTurnosPaciente } from '../../queries/pacientes/listarTurnos.queries.js';

export const getTurnosPaciente = async (idUsuario) => consultarTurnosPaciente(idUsuario);
