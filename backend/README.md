# TPF Programacion III

Sistema de turnos medicos.

Grupo BG

Integrantes:

- Leonel Piter
- Cintia Rios
- Adriana Quiroga
- Yamila Lorenzo
- Miriam Canosa

## Instalacion

Instalar las dependencias:

```bash
npm install
```

Configurar la conexion a la base de datos en `backend/.env`.

Ejemplo:

```env
PORT=3001
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=
DB_NAME=tpf_prog_3
JWT_SECRET=clave_secreta
```

Para iniciar el servidor:

```bash
npm start
```

Para iniciar con nodemon:

```bash
npm run dev
```

Servidor:

```text
http://localhost:3001
```

Swagger:

```text
http://localhost:3001/api-docs

```

## Aclaracion sobre la base de datos

en el archivo `Dump.sql` original, la columna que indica si un turno fue atendido aparece escrita como atentido.

El proyecto utiliza el nombre corregido `atendido`.




## Login

```http
POST /v1/auth/login
```

```json
{
  "email": "ejem@correo.com",
  "contrasenia": "buscar la q corresponde en bd"
}
```

Para utilizar las rutas protegidas se debe enviar el token:

```text
Authorization: Bearer token
```

Roles:

- Medico: 1
- Paciente: 2
- Administrador: 3

## Paciente

```http
GET /v1/turnos/paciente
GET /v1/especialidades
GET /v1/medicos
GET /v1/medicos/especialidad/1
POST /v1/turnos
```

Ejemplo para crear un turno:

```json
{
  "id_medico": 1,
  "id_obra_social": 1,
  "fecha_hora": "2027-01-15T10:30:00"
}
```

## Medico

```http
GET /v1/turnos/medico
GET /v1/medicos
PATCH /v1/turnos/1/atendido
PATCH /v1/turnos/1/observaciones
```

Ejemplo de observacion:

```json
{
  "observaciones": "paciente atendido. Se indica reposo."
}
```

## Administrador

```http
GET /v1/admin/administrador
POST /v1/admin/turnos
GET /v1/admin/estadisticas/atenciones
GET /v1/admin/informes/turnos/pdf
POST /v1/admin/uploads

POST /v1/especialidades
PUT /v1/especialidades/1

GET /v1/obras-sociales
POST /v1/obras-sociales
PUT /v1/obras-sociales/1

PUT /v1/admin/medicos/1/especialidad
POST /v1/admin/medicos/1/obras-sociales
POST /v1/admin/pacientes/1/obras-sociales
```

El informe PDF se descarga desde:

```http
GET /v1/admin/informes/turnos/pdf
```
