const db = require('../../config/db');

const listaTurnosMedicos = async (req, res) => { 
    try {
        const userId = req.user.id_usuario;

        if (!userId) {
            return res.status(400).json({ message: "ID de usuario no encontrado en el token" });
        }

        const sql = `
            SELECT 
                tr.id_turno_reserva,
                tr.fecha_hora,
                u_pac.apellido AS paciente_apellido,
                u_pac.nombres AS paciente_nombre,
                os.nombre AS obra_social_nombre,
                tr.valor_total,
                tr.atentido
            FROM turnos_reservas AS tr
            INNER JOIN pacientes AS p ON tr.id_paciente = p.id_paciente
            INNER JOIN usuarios AS u_pac ON p.id_usuario = u_pac.id_usuario
            INNER JOIN obras_sociales AS os ON tr.id_obra_social = os.id_obra_social
            INNER JOIN medicos AS m ON tr.id_medico = m.id_medico
            WHERE m.id_usuario = ? AND tr.activo = 1
            ORDER BY tr.fecha_hora ASC
        `;

       
        const [rows] = await db.query(sql, [userId]);
        
       
        return res.json(rows);

    } catch (error) {
        console.error('ERROR DETALLADO:', error.message);
        return res.status(500).json({ 
            message: 'Error al obtener los turnos', 
            details: error.message 
        });
    }
};

module.exports = { listaTurnosMedicos };