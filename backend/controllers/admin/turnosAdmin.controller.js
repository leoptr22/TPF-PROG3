import { crearTurnoAdminDTO } from '../../DTO/turnos.dto.js';
import { turnoCreadoResponseDTO } from '../../DTO/turnos.dto.js';
import { registrarTurnoAdmin } from '../../services/admin/turnosAdmin.service.js';

export const registrarTurno = async (req, res) => {
    try {
        const result = await registrarTurnoAdmin(crearTurnoAdminDTO(req.body));
        return res.status(201).json(turnoCreadoResponseDTO(result, 'Turno registrado'));
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
};
