import { traerPacienteByUserId, crearTurno } from '../../services/pacientes/crearTurno.service.js';

export const crearTurnoPaciente = async (req, res) => {
    try {
        const userId = req.user.id_usuario;
        const { id_medico, id_obra_social, fecha_hora } = req.body;

        const paciente = await traerPacienteByUserId(userId);

        if (paciente.length === 0) {
            return res.status(404).json({ message: "Usuario no registrado como paciente" });
        }

        const id_paciente = paciente[0].id_paciente;

        const resultado = await crearTurno({ id_medico, id_paciente, id_obra_social, fecha_hora });

        return res.status(201).json({
            message: "Turno reservado con éxito",
            id_turno: resultado.insertId
        });

    } catch (error) {
        console.error('Error en la reserva:', error.message);
        return res.status(error.statusCode || 500).json({
            message: error.message || "Error al procesar el turno"
        });
    }
};
