import {
    crearObraSocial,
    editarObraSocial,
    eliminarObraSocial,
    listarObrasSociales
} from '../../queries/admin/obrasSociales.queries.js';

const crearError = (message, statusCode = 400) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

export const listarObrasSocialesAdmin = async () => listarObrasSociales();

export const crearObraSocialAdmin = async ({ nombre, descripcion = '', porcentaje_descuento = 0, es_particular = 0 }) => {
    if (!nombre) {
        throw crearError('El nombre de la obra social es obligatorio');
    }

    return crearObraSocial({ nombre, descripcion, porcentaje_descuento, es_particular });
};

export const editarObraSocialAdmin = async (idObraSocial, { nombre, descripcion = '', porcentaje_descuento = 0, es_particular = 0 }) => {
    if (!nombre) {
        throw crearError('El nombre de la obra social es obligatorio');
    }

    const result = await editarObraSocial(idObraSocial, { nombre, descripcion, porcentaje_descuento, es_particular });
    if (result.affectedRows === 0) {
        throw crearError('Obra social no encontrada', 404);
    }

    return result;
};

export const eliminarObraSocialAdmin = async (idObraSocial) => {
    const result = await eliminarObraSocial(idObraSocial);
    if (result.affectedRows === 0) {
        throw crearError('Obra social no encontrada', 404);
    }

    return result;
};


