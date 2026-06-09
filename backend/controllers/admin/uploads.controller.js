export const subirArchivo = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Debe enviar un archivo' });
    }

    return res.status(201).json({
        message: 'Archivo cargado correctamente',
        archivo: {
            nombre_original: req.file.originalname,
            nombre_guardado: req.file.filename,
            path: req.file.path,
            mimetype: req.file.mimetype,
            size: req.file.size
        }
    });
};
