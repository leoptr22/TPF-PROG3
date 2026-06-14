import { getEspecialidadesPaciente } from '../../services/pacientes/listarEspecialidades.service.js';

export const listaEspecialidadesPaciente = async (req, res) => {
    try {
        const especialidades = await getEspecialidadesPaciente();
        return res.json(especialidades);
    } catch (error) {
        console.error('ERROR DETALLADO:', error.message);
        return res.status(500).json({ 
            message: 'Error al obtener las especialidades', 
            details: error.message 
        });
    }
};
