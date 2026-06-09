import { getTurnosPaciente } from '../../services/pacientes/listarTurnos.service.js';

export const listaTurnosPaciente = async (req, res) => { 
    try {
        const userId = req.user.id_usuario;

        if (!userId) {
            return res.status(400).json({ 
                message: "ID de usuario no encontrado en el token" 
            });
        }

        const turnos = await getTurnosPaciente(userId);
        
        return res.json(turnos);

    } catch (error) {
        console.error('ERROR EN LISTA_TURNOS_PACIENTE:', error.message);
        return res.status(500).json({ 
            message: 'Error al obtener los turnos', 
            details: error.message 
        });
    }
};