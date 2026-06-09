import { agregarObservacionTurnoMedico } from '../../services/medicos/observaciones.service.js';

export const agregarObservacionTurno = async (req, res) => {
    try {
        await agregarObservacionTurnoMedico({
            id_turno: req.params.id_turno,
            id_usuario_medico: req.user.id_usuario,
            observaciones: req.body.observaciones
        });

        return res.json({ message: 'Observacion agregada al turno' });
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
};
