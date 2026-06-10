import PDFDocument from 'pdfkit';
import { obtenerDatosInformeTurnos } from '../../queries/admin/informes.queries.js';

const escribirLinea = (doc, label, value) => {
    doc.font('Helvetica-Bold').text(`${label}: `, { continued: true });
    doc.font('Helvetica').text(String(value ?? 0));
};

const formatearFecha = (fecha) => {
    if (!fecha) return 'Sin fecha';

    return new Date(fecha).toLocaleString('es-AR', {
        dateStyle: 'short',
        timeStyle: 'short'
    });
};

export const generarInformeTurnosPDF = async ({
    fecha_desde = null,
    fecha_hasta = null
}) => {

    const datos = await obtenerDatosInformeTurnos({
        fecha_desde,
        fecha_hasta
    });

    const doc = new PDFDocument({
        margin: 40,
        size: 'A4'
    });

    const chunks = [];

    doc.on('data', (chunk) => chunks.push(chunk));

    const finished = new Promise((resolve, reject) => {
        doc.on('end', () => resolve(Buffer.concat(chunks)));
        doc.on('error', reject);
    });

    // Encabezado
    doc.fontSize(20)
        .font('Helvetica-Bold')
        .text('INFORME DE TURNOS', {
            align: 'center'
        });

    doc.fontSize(11)
        .font('Helvetica-Oblique')
        .text('Calidad en atención y servicio', {
            align: 'center'
        });

    doc.moveDown();

    escribirLinea(
        doc,
        'Informe generado el',
        new Date().toLocaleString('es-AR')
    );

    doc.text(`Fecha desde: ${fecha_desde || 'Sin filtro'}`);
    doc.text(`Fecha hasta: ${fecha_hasta || 'Sin filtro'}`);

    doc.moveDown();

    // Resumen
    doc.fontSize(14)
        .font('Helvetica-Bold')
        .text('RESUMEN');

    doc.moveDown(0.5);

    doc.fontSize(10);

    escribirLinea(
        doc,
        'Cantidad de turnos',
        datos.resumen?.cantidad_turnos
    );

    escribirLinea(
        doc,
        'Cantidad de turnos atendidos',
        datos.resumen?.cantidad_atendidos
    );

    escribirLinea(
        doc,
        'Cantidad de pacientes',
        datos.resumen?.cantidad_pacientes
    );

    escribirLinea(
        doc,
        'Cantidad de médicos',
        datos.resumen?.cantidad_medicos
    );

    escribirLinea(
        doc,
        'Cantidad de obras sociales',
        datos.resumen?.cantidad_obras_sociales
    );

    escribirLinea(
        doc,
        'Total facturado',
        `$${datos.resumen?.total_facturado ?? 0}`
    );

    doc.moveDown();

    // Turnos por obra social
    doc.fontSize(14)
        .font('Helvetica-Bold')
        .text('TURNOS POR OBRA SOCIAL');

    doc.moveDown(0.5);

    doc.fontSize(10)
        .font('Helvetica');

    if (datos.por_obra_social.length === 0) {

        doc.text('No hay datos para el rango seleccionado.');

    } else {

        datos.por_obra_social.forEach((item) => {

            doc.text(
                `${item.obra_social} | Turnos: ${item.cantidad_turnos} | Pacientes: ${item.cantidad_pacientes} | Total: $${item.total_facturado}`
            );

        });

    }

    doc.moveDown();

    // Detalle
    doc.fontSize(14)
        .font('Helvetica-Bold')
        .text('DETALLE DE TURNOS');

    doc.moveDown(0.5);

    if (datos.turnos.length === 0) {

        doc.font('Helvetica')
            .text('No hay turnos para el rango seleccionado.');

    } else {

        datos.turnos.forEach((turno) => {

            const atendido =
                Number(turno.atendido ?? turno.atentido) === 1
                    ? 'Sí'
                    : 'No';

            doc.font('Helvetica-Bold')
                .text(`Turno #${turno.id_turno_reserva}`);

            doc.font('Helvetica')
                .text(`Fecha: ${formatearFecha(turno.fecha_hora)}`);

            doc.text(`Paciente: ${turno.paciente}`);

            doc.text(`Médico: ${turno.medico}`);

            doc.text(`Obra social: ${turno.obra_social}`);

            doc.text(`Valor: $${turno.valor_total}`);

            doc.text(`Atendido: ${atendido}`);

            doc.moveDown();

            doc.moveTo(40, doc.y)
                .lineTo(550, doc.y)
                .strokeColor('#CCCCCC')
                .stroke();

            doc.moveDown();

            if (doc.y > 720) {
                doc.addPage();
            }

        });

    }

    doc.end();

    return finished;
};