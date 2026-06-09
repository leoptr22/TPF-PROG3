import {
    asociarMedicoEspecialidadDTO,
    asociarObraSocialDTO
} from '../../DTO/admin.dto.js';

import {
    asociarMedicoEspecialidadAdmin,
    asociarMedicoObraSocialAdmin,
    asociarPacienteObraSocialAdmin
} from '../../services/admin/asociaciones.service.js';

export const asociarMedicoEspecialidad = async (req, res) => {
    try {
        const dto = asociarMedicoEspecialidadDTO(req.params, req.body);
        await asociarMedicoEspecialidadAdmin(dto.id_medico, dto.id_especialidad);
        return res.json({ message: 'Medico asociado a especialidad' });
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
};

export const asociarMedicoObraSocial = async (req, res) => {
    try {
        const dto = asociarObraSocialDTO(req.params, req.body, 'id_medico');
        await asociarMedicoObraSocialAdmin(dto.id_medico, dto.id_obra_social);
        return res.json({ message: 'Medico asociado a obra social' });
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
};

export const asociarPacienteObraSocial = async (req, res) => {
    try {
        const dto = asociarObraSocialDTO(req.params, req.body, 'id_paciente');
        await asociarPacienteObraSocialAdmin(dto.id_paciente, dto.id_obra_social);
        return res.json({ message: 'Paciente asociado a obra social' });
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
};
