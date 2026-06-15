import {
    especialidadCreadaResponseDTO,
    especialidadRequestDTO
} from '../../DTO/admin.dto.js';
import {
    crearEspecialidadAdmin,
    editarEspecialidadAdmin,
    eliminarEspecialidadAdmin,
    listarEspecialidadesAdmin
} from '../../services/admin/especialidades.service.js';

export const listarEspecialidades = async (req, res) => {
    try {
        const especialidades = await listarEspecialidadesAdmin();
        return res.json(especialidades);
    } catch (error) {
        return res.status(500).json({ message: 'Error al listar especialidades', details: error.message });
    }
};

export const crearEspecialidad = async (req, res) => {
    try {
        const result = await crearEspecialidadAdmin(especialidadRequestDTO(req.body));
        return res.status(201).json(especialidadCreadaResponseDTO(result));
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
};

export const editarEspecialidad = async (req, res) => {
    try {
        await editarEspecialidadAdmin(req.params.id_especialidad, especialidadRequestDTO(req.body));
        return res.json({ message: 'Especialidad actualizada' });
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
};

export const eliminarEspecialidad = async (req, res) => {
    try {
        await eliminarEspecialidadAdmin(req.params.id_especialidad);
        return res.json({ message: 'Especialidad eliminada' });
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
};
