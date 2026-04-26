const db = require('../config/db');

const listaTurnosPaciente = async (req, res) => { 
    try {
        const userId = req.user.id_usuario;
        if (!userId) {
            return res.status(400).json({ message: "ID de usuario no encontrado en el token" });
        }

        const sql = `SELECT 
    tr.id_turno_reserva,
    tr.fecha_hora,
    u_pac.apellido AS paciente_apellido,
    u_pac.nombres AS paciente_nombre,
    u_med.apellido AS medico_apellido,
    e.nombre AS especialidad,
    os.nombre AS obra_social,
    tr.valor_total,
    tr.atentido
FROM turnos_reservas AS tr
-- Unión para obtener datos del paciente
INNER JOIN pacientes AS p ON tr.id_paciente = p.id_paciente
INNER JOIN usuarios AS u_pac ON p.id_usuario = u_pac.id_usuario
-- Unión para obtener datos del médico y su especialidad
INNER JOIN medicos AS m ON tr.id_medico = m.id_medico
INNER JOIN usuarios AS u_med ON m.id_usuario = u_med.id_usuario
INNER JOIN especialidades AS e ON m.id_especialidad = e.id_especialidad
-- Unión para la obra social del turno
INNER JOIN obras_sociales AS os ON tr.id_obra_social = os.id_obra_social
-- Filtro para ver solo los turnos que no fueron borrados lógicamente
WHERE tr.activo = 1
ORDER BY tr.fecha_hora DESC;`;

        const [rows] = await db.query(sql, [userId]);
        return res.json(rows);
    } catch (error) {
        console.error('ERROR DETALLADO:', error.message);
        return res.status(500).json({   essage: 'Error al obtener los turnos', 
            details: error.message 
        });
    }};

module.exports = { listaTurnosPaciente };   