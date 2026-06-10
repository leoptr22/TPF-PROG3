import { ejecutarEnTransaccion } from '../../queries/transaction.queries.js';
import {
    crearTurno as insertarTurno,
    traerMedicoActivoById,
    traerObraSocialActivaById,
    traerPacienteActivoById,
    traerPacienteByUserId as buscarPacienteByUserId
} from '../../queries/pacientes/crearTurno.queries.js';

const crearError = (message, statusCode = 400) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

const calcularValorTotal = (valorConsulta, obraSocial) => {
    if (Number(obraSocial.es_particular) === 1) {
        return Number(valorConsulta);
    }

    const descuento = Number(obraSocial.porcentaje_descuento || 0);
    return Number((Number(valorConsulta) * (1 - descuento / 100)).toFixed(2));
};

export const traerPacienteByUserId = async (userId) => buscarPacienteByUserId(userId);

export const crearTurno = async ({ id_medico, id_paciente, id_obra_social, fecha_hora }) => {
    if (!id_medico || !id_paciente || !id_obra_social || !fecha_hora) {
        throw crearError('id_medico, id_paciente, id_obra_social y fecha_hora son obligatorios');
    }

    return ejecutarEnTransaccion(async (connection) => {
        const [paciente, medico, obraSocial] = await Promise.all([
            traerPacienteActivoById(id_paciente, connection),
            traerMedicoActivoById(id_medico, connection),
            traerObraSocialActivaById(id_obra_social, connection)
        ]);

        if (!paciente) throw crearError('Paciente no encontrado o inactivo', 404);
        if (!medico) throw crearError('Medico no encontrado o inactivo', 404);
        if (!obraSocial) throw crearError('Obra social no encontrada o inactiva', 404);

        const valor_total = calcularValorTotal(medico.valor_consulta, obraSocial);
        return insertarTurno(
            { id_medico, id_paciente, id_obra_social, fecha_hora, valor_total },
            connection
        );
    });
};
