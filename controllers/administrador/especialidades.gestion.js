import *  as EspecialidadesService from '../../services/administrador/admin.service.js';

// controlador para obtener todas las especialidades

export const getEspecialidades = async (req, res) => {
    try {
        const especialidades = await EspecialidadesService.getAllEspecialidades();
        return res.json(especialidades);
    } catch (error) {
        console.error('ERROR DETALLADO:', error.message);
        return res.status(500).json({   
            message: 'Error al obtener las especialidades',
            details: error.message
        });
    }
};

// controlador para crear una nueva especialidad
export const createEspecialidad = async (req, res) => {
    try {
        const { nombre } = req.body;
        const result = await EspecialidadesService.createEspecialidad(nombre);
        if (result.affectedRows > 0) {
    return res.status(201).json({
        success: true,
        message: "Especialidad creada con éxito",
        data: {
            id: result.insertId,
            nombre: nombre
        }
    });
} else {
    
    return res.status(400).json({
        success: false,
        message: "No se pudo crear la especialidad"
    });
}
        
        return res.status(201).json(result);
    } catch (error) {
        console.error('ERROR DETALLADO:', error.message);
        return res.status(500).json({   
            message: 'Error al crear la especialidad',
            details: error.message
        });
    }
};

// controlador para editar una especialidad
export const updateEspecialidad = async (req, res) => {
    try {
        const { id_especialidad } = req.params;
        const { nombre } = req.body;
        const result = await EspecialidadesService.updateEspecialidad(id_especialidad, nombre);
        if (result.affectedRows > 0) {
    return res.json({
        success: true,
        message: "Especialidad actualizada con éxito",
        data: {
            id: id_especialidad,
            nombre: nombre
        }    });
        } else {
    return res.status(404).json({
        success: false,
        message: "Especialidad no encontrada o no actualizada"
    });
        }

        return res.json(result);
    } catch (error) {
        console.error('ERROR DETALLADO:', error.message);
        return res.status(500).json({   
            message: 'Error al actualizar la especialidad',
            details: error.message
        });
    }   
};


// controlador para eliminar una especialidad
export const deleteEspecialidad = async (req, res) => {
    try {
        const { id_especialidad } = req.params;
        const result = await EspecialidadesService.deleteEspecialidad(id_especialidad);

        if (result.affectedRows > 0) {
    return res.json({
        success: true,
        message: "Especialidad eliminada con éxito",
        data: {
            id: id_especialidad
        }
    });
} else {
    return res.status(404).json({
        success: false,
        message: "Especialidad no encontrada o no eliminada"
    });
}
        return res.json(result);
    } catch (error) {
        console.error('ERROR DETALLADO:', error.message);
        return res.status(500).json({
            message: 'Error al eliminar la especialidad',
            details: error.message
        });
    }
};