export const especialidadRequestDTO = ({ nombre }) => ({
    nombre: nombre?.trim()
});

export const especialidadCreadaResponseDTO = (result) => ({
    message: 'Especialidad creada',
    id_especialidad: result.insertId
});

export const obraSocialRequestDTO = ({ nombre, descripcion = '', porcentaje_descuento = 0, es_particular = 0 }) => ({
    nombre: nombre?.trim(),
    descripcion,
    porcentaje_descuento: Number(porcentaje_descuento),
    es_particular: Number(es_particular)
});

export const obraSocialCreadaResponseDTO = (result) => ({
    message: 'Obra social creada',
    id_obra_social: result.insertId
});

export const asociarMedicoEspecialidadDTO = (params, body) => ({
    id_medico: Number(params.id_medico),
    id_especialidad: Number(body.id_especialidad)
});

export const asociarObraSocialDTO = (params, body, idParamName) => ({
    [idParamName]: Number(params[idParamName]),
    id_obra_social: Number(body.id_obra_social)
});

export const estadisticasQueryDTO = ({ fecha_desde = null, fecha_hasta = null }) => ({
    fecha_desde,
    fecha_hasta
});
