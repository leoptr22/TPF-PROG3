import {
    crearEspecialidad,
    editarEspecialidad,
    listarEspecialidades
} from '../../queries/admin/especialidades.queries.js';

const crearError = (message, statusCode = 400) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

export const listarEspecialidadesAdmin = async () => listarEspecialidades();

export const crearEspecialidadAdmin = async ({ nombre }) => {
    if (!nombre) {
        throw crearError('El nombre de la especialidad es obligatorio');
    }

    return crearEspecialidad({ nombre });
};

export const editarEspecialidadAdmin = async (idEspecialidad, { nombre }) => {
    if (!nombre) {
        throw crearError('El nombre de la especialidad es obligatorio');
    }

    const result = await editarEspecialidad(idEspecialidad, { nombre });
    if (result.affectedRows === 0) {
        throw crearError('Especialidad no encontrada', 404);
    }

    return result;
};


