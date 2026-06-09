import PDFDocument from 'pdfkit';
import { obtenerDatosInformeTurnos } from '../../queries/admin/informes.queries.js';

const escribirLinea = (doc, label, value) => {
    doc.font('Helvetica-Bold').text(`${label}: `, { continued: true });
    doc.font('Helvetica').text(String(value ?? 0));
};

export const generarInformeTurnosPDF = async ({ fecha_desde = null, fecha_hasta = null }) => {
    const datos = await obtenerDatosInformeTurnos({ fecha_desde, fecha_hasta });
    const doc = new PDFDocument({ margin: 40, size: 'A4' });
    const chunks = [];

    doc.on('data', (chunk) => chunks.push(chunk));

    const finished = new Promise((resolve, reject) => {
        doc.on('end', () => resolve(Buffer.concat(chunks)));
        doc.on('error', reject);
    });

    doc.fontSize(18).font('Helvetica-Bold').text('Informe de turnos', { align: 'center' });
    doc.moveDown();
    doc.fontSize(10).font('Helvetica').text(`Fecha desde: ${fecha_desde || 'Sin filtro'}`);
    doc.text(`Fecha hasta: ${fecha_hasta || 'Sin filtro'}`);
    doc.moveDown();

    doc.fontSize(14).font('Helvetica-Bold').text('Resumen');
    doc.moveDown(0.5);
    doc.fontSize(10);
    escribirLinea(doc, 'Cantidad de turnos', datos.resumen?.cantidad_turnos);
    escribirLinea(doc, 'Cantidad de turnos atendidos', datos.resumen?.cantidad_atendidos);
    escribirLinea(doc, 'Cantidad de pacientes', datos.resumen?.cantidad_pacientes);
    escribirLinea(doc, 'Cantidad de medicos', datos.resumen?.cantidad_medicos);
    escribirLinea(doc, 'Cantidad de obras sociales', datos.resumen?.cantidad_obras_sociales);
    escribirLinea(doc, 'Total facturado', datos.resumen?.total_facturado);
    doc.moveDown();

    doc.fontSize(14).font('Helvetica-Bold').text('Turnos por obra social');
    doc.moveDown(0.5);
    doc.fontSize(9).font('Helvetica');
    if (datos.por_obra_social.length === 0) {
        doc.text('No hay datos para el rango seleccionado.');
    } else {
        datos.por_obra_social.forEach((item) => {
            doc.text(`${item.obra_social} - Turnos: ${item.cantidad_turnos} - Pacientes: ${item.cantidad_pacientes} - Total: ${item.total_facturado}`);
        });
    }
    doc.moveDown();

    doc.fontSize(14).font('Helvetica-Bold').text('Detalle de turnos');
    doc.moveDown(0.5);
    doc.fontSize(8).font('Helvetica');
    if (datos.turnos.length === 0) {
        doc.text('No hay turnos para el rango seleccionado.');
    } else {
        datos.turnos.forEach((turno) => {
            const atendido = Number(turno.atentido) === 1 ? 'Si' : 'No';
            doc.text(`#${turno.id_turno_reserva} | ${turno.fecha_hora} | Paciente: ${turno.paciente} | Medico: ${turno.medico} | OS: ${turno.obra_social} | Valor: ${turno.valor_total} | Atendido: ${atendido}`);
        });
    }

    doc.end();
    return finished;
};

