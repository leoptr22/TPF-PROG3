const { marcarTurnoAtendido: marcarTurnoAtendidoService } = require('../../services/medicos/marcarTurnoAtendido.service');

const marcarTurnoAtendido = async (req, res) => {
    try {
        const { id_turno } = req.params;

        const result = await marcarTurnoAtendidoService(id_turno);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Turno no encontrado" });
        }

        return res.json({ message: "Turno marcado como atendido" });

    } catch (error) {
        console.error('ERROR DETALLADO:', error.message);
        return res.status(500).json({ 
            message: 'Error al marcar el turno como atendido', 
            details: error.message 
        });
    }
};

module.exports = { marcarTurnoAtendido };