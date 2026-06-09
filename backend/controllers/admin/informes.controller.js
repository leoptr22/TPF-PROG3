import { generarInformeTurnosPDF } from '../../services/admin/informes.service.js';

export const descargarInformeTurnosPDF = async (req, res) => {
    try {
        const pdf = await generarInformeTurnosPDF(req.query);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="informe-turnos.pdf"');
        return res.send(pdf);
    } catch (error) {
        return res.status(500).json({
            message: 'Error al generar informe PDF de turnos',
            details: error.message
        });
    }
};
