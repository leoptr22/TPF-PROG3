import { estadisticasQueryDTO } from '../../DTO/admin.dto.js';
import { obtenerEstadisticasAtencionesAdmin } from '../../services/admin/estadisticas.service.js';

export const obtenerEstadisticasAtenciones = async (req, res) => {
    try {
        const estadisticas = await obtenerEstadisticasAtencionesAdmin(estadisticasQueryDTO(req.query));
        return res.json(estadisticas);
    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener estadisticas. Verifique que exista el stored procedure sp_estadisticas_atenciones.',
            details: error.message
        });
    }
};
