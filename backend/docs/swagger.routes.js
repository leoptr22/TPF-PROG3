/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Autenticacion de usuarios
 *   - name: Turnos
 *     description: Gestion de turnos y reservas
 *   - name: Medicos
 *     description: Consultas de medicos
 *   - name: Especialidades
 *     description: Gestion y consulta de especialidades
 *   - name: Obras Sociales
 *     description: Gestion de obras sociales
 *   - name: Administrador
 *     description: Funcionalidades exclusivas del rol administrador
 *
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required: [email, contrasenia]
 *       properties:
 *         email:
 *           type: string
 *           example: ferben@correo.com
 *         contrasenia:
 *           type: string
 *           example: "123456"
 *     TurnoPacienteRequest:
 *       type: object
 *       required: [id_medico, id_obra_social, fecha_hora]
 *       properties:
 *         id_medico:
 *           type: integer
 *           example: 3
 *         id_obra_social:
 *           type: integer
 *           example: 2
 *         fecha_hora:
 *           type: string
 *           format: date-time
 *           example: 2026-05-15T10:30:00
 *     TurnoAdminRequest:
 *       type: object
 *       required: [id_paciente, id_medico, id_obra_social, fecha_hora]
 *       properties:
 *         id_paciente:
 *           type: integer
 *           example: 1
 *         id_medico:
 *           type: integer
 *           example: 3
 *         id_obra_social:
 *           type: integer
 *           example: 2
 *         fecha_hora:
 *           type: string
 *           format: date-time
 *           example: 2026-05-15T10:30:00
 *     EspecialidadRequest:
 *       type: object
 *       required: [nombre]
 *       properties:
 *         nombre:
 *           type: string
 *           example: Cardiologia
 *     ObraSocialRequest:
 *       type: object
 *       required: [nombre]
 *       properties:
 *         nombre:
 *           type: string
 *           example: OSDE
 *         descripcion:
 *           type: string
 *           example: Obra social OSDE
 *         porcentaje_descuento:
 *           type: number
 *           example: 10
 *         es_particular:
 *           type: integer
 *           example: 0
 *     IdEspecialidadRequest:
 *       type: object
 *       required: [id_especialidad]
 *       properties:
 *         id_especialidad:
 *           type: integer
 *           example: 2
 *     IdObraSocialRequest:
 *       type: object
 *       required: [id_obra_social]
 *       properties:
 *         id_obra_social:
 *           type: integer
 *           example: 2
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Error al procesar la solicitud
 */

/**
 * @swagger
 * /v1/auth/login:
 *   post:
 *     summary: Iniciar sesion
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login exitoso. Devuelve token JWT y datos del usuario.
 *       400:
 *         description: Faltan datos obligatorios.
 *       401:
 *         description: Credenciales invalidas.
 */

/**
 * @swagger
 * /v1/turnos:
 *   post:
 *     summary: Crear reserva propia como paciente
 *     tags: [Turnos]
 *     security:
 *       - bearerAuth: []
 *     description: El valor_total se calcula en el backend segun medico y obra social.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TurnoPacienteRequest'
 *     responses:
 *       201:
 *         description: Turno reservado.
 *       401:
 *         description: Token no enviado.
 *       403:
 *         description: Rol no autorizado.
 */

/**
 * @swagger
 * /v1/turnos/paciente:
 *   get:
 *     summary: Listar turnos propios del paciente autenticado
 *     tags: [Turnos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de turnos del paciente.
 *       403:
 *         description: Rol no autorizado.
 */

/**
 * @swagger
 * /v1/turnos/medico:
 *   get:
 *     summary: Listar turnos propios del medico autenticado
 *     tags: [Turnos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de turnos del medico.
 *       403:
 *         description: Rol no autorizado.
 */

/**
 * @swagger
 * /v1/turnos/{id_turno}/atendido:
 *   patch:
 *     summary: Marcar turno como atendido
 *     tags: [Turnos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_turno
 *         required: true
 *         schema:
 *           type: integer
 *         example: 2
 *     responses:
 *       200:
 *         description: Turno marcado como atendido.
 *       404:
 *         description: Turno no encontrado.
 */

/**
 * @swagger
 * /v1/especialidades:
 *   get:
 *     summary: Listar especialidades activas
 *     tags: [Especialidades]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de especialidades.
 *   post:
 *     summary: Crear especialidad
 *     tags: [Especialidades]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EspecialidadRequest'
 *     responses:
 *       201:
 *         description: Especialidad creada.
 */

/**
 * @swagger
 * /v1/especialidades/{id_especialidad}:
 *   put:
 *     summary: Editar especialidad
 *     tags: [Especialidades]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_especialidad
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EspecialidadRequest'
 *     responses:
 *       200:
 *         description: Especialidad actualizada.
 *       404:
 *         description: Especialidad no encontrada.
 *   delete:
 *     summary: Eliminar logicamente una especialidad
 *     tags: [Especialidades]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_especialidad
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Especialidad eliminada.
 *       404:
 *         description: Especialidad no encontrada.
 */

/**
 * @swagger
 * /v1/medicos:
 *   get:
 *     summary: Listar todos los medicos activos
 *     tags: [Medicos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: especialidad
 *         required: false
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Lista de medicos.
 */

/**
 * @swagger
 * /v1/medicos/especialidad/{id_especialidad}:
 *   get:
 *     summary: Listar medicos por especialidad
 *     tags: [Medicos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_especialidad
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Lista de medicos de la especialidad.
 *       404:
 *         description: No se encontraron medicos.
 */

/**
 * @swagger
 * /v1/obras-sociales:
 *   get:
 *     summary: Listar obras sociales activas
 *     tags: [Obras Sociales]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de obras sociales.
 *   post:
 *     summary: Crear obra social
 *     tags: [Obras Sociales]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ObraSocialRequest'
 *     responses:
 *       201:
 *         description: Obra social creada.
 */

/**
 * @swagger
 * /v1/obras-sociales/{id_obra_social}:
 *   put:
 *     summary: Editar obra social
 *     tags: [Obras Sociales]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_obra_social
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ObraSocialRequest'
 *     responses:
 *       200:
 *         description: Obra social actualizada.
 *       404:
 *         description: Obra social no encontrada.
 *   delete:
 *     summary: Eliminar logicamente una obra social
 *     tags: [Obras Sociales]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_obra_social
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Obra social eliminada.
 *       404:
 *         description: Obra social no encontrada.
 */

/**
 * @swagger
 * /v1/admin/administrador:
 *   get:
 *     summary: Verificar ruta de administrador
 *     tags: [Administrador]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Ruta de admin funcionando.
 */

/**
 * @swagger
 * /v1/admin/medicos/{id_medico}/especialidad:
 *   put:
 *     summary: Asociar medico con especialidad
 *     tags: [Administrador]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_medico
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IdEspecialidadRequest'
 *     responses:
 *       200:
 *         description: Medico asociado a especialidad.
 */

/**
 * @swagger
 * /v1/admin/medicos/{id_medico}/obras-sociales:
 *   post:
 *     summary: Asociar medico con obra social
 *     tags: [Administrador]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_medico
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IdObraSocialRequest'
 *     responses:
 *       200:
 *         description: Medico asociado a obra social.
 */

/**
 * @swagger
 * /v1/admin/pacientes/{id_paciente}/obras-sociales:
 *   post:
 *     summary: Asociar paciente con obra social
 *     tags: [Administrador]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_paciente
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IdObraSocialRequest'
 *     responses:
 *       200:
 *         description: Paciente asociado a obra social.
 */

/**
 * @swagger
 * /v1/admin/turnos:
 *   post:
 *     summary: Registrar turno para paciente, medico y fecha
 *     tags: [Administrador]
 *     security:
 *       - bearerAuth: []
 *     description: El valor_total se calcula en el backend.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TurnoAdminRequest'
 *     responses:
 *       201:
 *         description: Turno registrado.
 */

/**
 * @swagger
 * /v1/admin/estadisticas/atenciones:
 *   get:
 *     summary: Obtener estadisticas de atenciones
 *     tags: [Administrador]
 *     security:
 *       - bearerAuth: []
 *     description: Ejecuta el procedimiento almacenado sp_estadisticas_atenciones.
 *     parameters:
 *       - in: query
 *         name: fecha_desde
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         example: 2026-01-01
 *       - in: query
 *         name: fecha_hasta
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         example: 2026-12-31
 *     responses:
 *       200:
 *         description: Estadisticas de atenciones.
 */

/**
 * @swagger
 * /v1/admin/informes/turnos/pdf:
 *   get:
 *     summary: Descargar informe PDF de turnos
 *     tags: [Administrador]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: fecha_desde
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         example: 2026-01-01
 *       - in: query
 *         name: fecha_hasta
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         example: 2026-12-31
 *     responses:
 *       200:
 *         description: Archivo PDF con cantidad de turnos, pacientes, medicos, obras sociales y detalle de turnos.
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 */

/**
 * @swagger
 * /v1/admin/uploads:
 *   post:
 *     summary: Cargar archivo usando Multer
 *     tags: [Administrador]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               archivo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Archivo cargado correctamente.
 */

/**
 * @swagger
 * /v1/turnos/{id_turno}/observaciones:
 *   patch:
 *     summary: Agregar observaciones del medico sobre la atencion
 *     tags: [Turnos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_turno
 *         required: true
 *         schema:
 *           type: integer
 *         example: 2
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [observaciones]
 *             properties:
 *               observaciones:
 *                 type: string
 *                 example: Paciente controlado. Se indica reposo y nuevo control en 7 dias.
 *     responses:
 *       200:
 *         description: Observacion agregada al turno.
 */
