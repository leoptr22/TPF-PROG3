import { getMedicosEspecialidad } from '../../services/pacientes/listarMedicosEspecialidad.service.js';

export const listarMedicosEspecialidad = async (req, res) => {
    try {
        const { id_especialidad } = req.params;

        const medicos = await getMedicosEspecialidad(id_especialidad);

        if (medicos.length === 0) {
            return res.status(404).json({ message: 'No se encontraron médicos para esta especialidad' });
        }

        return res.json(medicos);

    } catch (error) {
        console.error('ERROR DETALLADO:', error.message);
        return res.status(500).json({ 
            message: 'Error al obtener los médicos de la especialidad',
            details: error.message 
        });
    }   
};