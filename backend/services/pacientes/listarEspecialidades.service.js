import { getEspecialidadesPaciente as listarEspecialidadesActivas } from '../../queries/pacientes/listarEspecialidades.queries.js';

export const getEspecialidadesPaciente = async () => listarEspecialidadesActivas();
