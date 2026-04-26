const db = require('../config/db');

const crearTurnoPaciente = async (req, res) => {
    try {
        const userId = req.user.id_usuario;
        const { id_medico, id_obra_social, fecha_hora, valor_total, atentido, activo } = req.body;
        const [paciente] = await db.query(
            'SELECT id_paciente FROM pacientes WHERE id_usuario = ?', 
            [userId] 
        ); 

        if (paciente.length === 0) {
            return res.status(404).json({ message: "Usuario no registrado como paciente" });
        }

        const id_paciente = paciente[0].id_paciente;

        // 2. Ejecutar el INSERT general
        const sql = `
            INSERT INTO turnos_reservas 
            (id_medico, id_paciente, id_obra_social, fecha_hora, valor_total, atentido, activo) 
            VALUES (?, ?, ?, ?, ?, 0, 1)
        `;

        const [resultado] = await db.query(sql, [
            id_medico, 
            id_paciente, 
            id_obra_social, 
            fecha_hora, 
            valor_total
        ]);

        return res.status(201).json({
            message: "Turno reservado con éxito",
            id_turno: resultado.insertId
        });

    } catch (error) {
        console.error('Error en la reserva:', error.message);
        return res.status(500).json({ message: "Error al procesar el turno" });
    }
};

module.exports = { 
    crearTurnoPaciente 
};