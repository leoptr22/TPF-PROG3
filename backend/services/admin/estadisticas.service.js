import { obtenerDatosInformeTurnos } from '../../queries/admin/informes.queries.js';

export const obtenerEstadisticasAtencionesAdmin = async ({ fecha_desde = null, fecha_hasta = null }) => {
    const datos = await obtenerDatosInformeTurnos({ fecha_desde, fecha_hasta });
    return {
        resumen: datos.resumen,
        por_obra_social: datos.por_obra_social
    };
};


