const {getEspecialidadesPaciente} = require('../../services/pacientes/listarEspecialidades.service.js');


const listaEspecialidadesPaciente = async (req, res) => {
    try {
        const userId = req.user.id_usuario;

if (!userId) {
            return res.status(400).json({ message: 'ID de usuario no proporcionado' });
        }

        const especialidades = await getpacienteEspecialidades(userId);
        return res.json(especialidades);
    } catch (error) {
        console.error('ERROR DETALLADO:', error.message);
        return res.status(500).json({ 
            message: 'Error al obtener las especialidades', 
            details: error.message 
        });
    }
};

module.exports = { listaEspecialidadesPaciente };