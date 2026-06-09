export const crearTurnoPacienteDTO = (body, idPaciente) => ({
    id_paciente: Number(idPaciente),
    id_medico: Number(body.id_medico),
    id_obra_social: Number(body.id_obra_social),
    fecha_hora: body.fecha_hora
});

export const crearTurnoAdminDTO = (body) => ({
    id_paciente: Number(body.id_paciente),
    id_medico: Number(body.id_medico),
    id_obra_social: Number(body.id_obra_social),
    fecha_hora: body.fecha_hora
});

export const turnoCreadoResponseDTO = (result, message = 'Turno registrado') => ({
    message,
    id_turno: result.insertId
});

export const turnoResponseDTO = (turno) => ({
    id_turno_reserva: turno.id_turno_reserva,
    fecha_hora: turno.fecha_hora,
    paciente_apellido: turno.paciente_apellido,
    paciente_nombre: turno.paciente_nombre,
    medico_apellido: turno.medico_apellido,
    especialidad: turno.especialidad,
    obra_social: turno.obra_social || turno.obra_social_nombre,
    valor_total: turno.valor_total,
    atentido: turno.atentido
});

export const turnosResponseDTO = (turnos) => turnos.map(turnoResponseDTO);
