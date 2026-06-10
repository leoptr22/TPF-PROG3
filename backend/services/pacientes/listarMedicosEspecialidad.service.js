import { getMedicosEspecialidad as consultarMedicosEspecialidad } from '../../queries/pacientes/listarMedicosEspecialidad.queries.js';

export const getMedicosEspecialidad = async (id_especialidad = null) => {
    return consultarMedicosEspecialidad(id_especialidad);
};
