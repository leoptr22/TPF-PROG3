const db = require('../../config/db');

const listarMedicosEspecialidad = async (req, res) => {


    try {

    const { id_especialidad} = req.params;

    const sql = `
        SELECT 
                m.id_medico, 
                u.nombres, 
                u.apellido, 
                e.nombre AS nombre_especialidad, 
                m.valor_consulta
            FROM medicos m
            INNER JOIN especialidades e ON m.id_especialidad = e.id_especialidad
            INNER JOIN usuarios u ON m.id_usuario = u.id_usuario
            WHERE m.id_especialidad = ? AND u.activo = 1
    `;

 
    const [rows] = await db.query(sql, [id_especialidad]);

    if (rows.length === 0) {
        return res.status(404).json({ message: 'No se encontraron médicos para esta especialidad' });
    }


    return res.json(rows);

    } catch (error) {
        console.error('ERROR DETALLADO:', error.message);
        return res.status(500).json({   
            message: 'Error al obtener los médicos de la especialidad',
            details: error.message 
        });
    }   
};

module.exports = { listarMedicosEspecialidad };
   