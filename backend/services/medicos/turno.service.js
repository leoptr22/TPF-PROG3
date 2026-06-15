import { getTurnosMedico as consultarTurnosMedico } from '../../queries/medicos/turno.queries.js';

export const getTurnosMedico = async (idUsuario) => consultarTurnosMedico(idUsuario);
