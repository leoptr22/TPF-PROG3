import { estadisticasQueryDTO } from '../../DTO/admin.dto.js';
import { obtenerEstadisticasAtencionesAdmin } from '../../services/admin/estadisticas.service.js';

export const obtenerEstadisticasAtenciones = async (req, res) => {
    try {
        const estadisticas = await obtenerEstadisticasAtencionesAdmin(estadisticasQueryDTO(req.query));
        return res.json(estadisticas);
    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener estadisticas mediante el procedimiento almacenado',
            details: error.message
        });
    }
};
