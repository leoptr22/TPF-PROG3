import db from '../../config/db.js';

export const obtenerEstadisticasAtenciones = async ({ fecha_desde = null, fecha_hasta = null }) => {
    const [resultSets] = await db.query(
        'CALL sp_estadisticas_atenciones(?, ?)',
        [fecha_desde, fecha_hasta]
    );

    return {
        resumen: resultSets[0]?.[0] || {},
        por_obra_social: resultSets[1] || []
    };
};
