import { obtenerEstadisticasAtenciones } from '../../queries/admin/estadisticas.queries.js';

export const obtenerEstadisticasAtencionesAdmin = async ({ fecha_desde = null, fecha_hasta = null }) => {
    return obtenerEstadisticasAtenciones({ fecha_desde, fecha_hasta });
};


