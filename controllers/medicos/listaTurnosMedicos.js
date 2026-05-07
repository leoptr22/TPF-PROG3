const { getTurnosMedico } = require('../../services/medicos/turno.service.js');

const listaTurnosMedicos = async (req, res) => {
    try {
        const userId = req.user.id_usuario;

        if (!userId) {
            return res.status(400).json({ message: "ID de usuario no encontrado en el token" });
        }

        const turnos = await getTurnosMedico(userId);
        return res.json(turnos);

    } catch (error) {
        console.error('ERROR DETALLADO:', error.message);
        return res.status(500).json({ 
            message: 'Error al obtener los turnos', 
            details: error.message 
        });
    }
};

module.exports = { listaTurnosMedicos };