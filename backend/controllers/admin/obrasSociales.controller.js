import {
    obraSocialCreadaResponseDTO,
    obraSocialRequestDTO
} from '../../DTO/admin.dto.js';
import {
    crearObraSocialAdmin,
    editarObraSocialAdmin,
    listarObrasSocialesAdmin
} from '../../services/admin/obrasSociales.service.js';

export const listarObrasSociales = async (req, res) => {
    try {
        const obrasSociales = await listarObrasSocialesAdmin();
        return res.json(obrasSociales);
    } catch (error) {
        return res.status(500).json({ message: 'Error al listar obras sociales', details: error.message });
    }
};

export const crearObraSocial = async (req, res) => {
    try {
        const result = await crearObraSocialAdmin(obraSocialRequestDTO(req.body));
        return res.status(201).json(obraSocialCreadaResponseDTO(result));
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
};

export const editarObraSocial = async (req, res) => {
    try {
        await editarObraSocialAdmin(req.params.id_obra_social, obraSocialRequestDTO(req.body));
        return res.json({ message: 'Obra social actualizada' });
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
};
