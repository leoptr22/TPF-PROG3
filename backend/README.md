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


npm install


Configurar la conexion a la base de datos en `backend/.env`.

Ejemplo:

```
PORT=3001
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=
DB_NAME=tpf_prog_3
JWT_SECRET=clave_secreta
```

Para iniciar el servidor:


npm start


Para iniciar con nodemon:

npm run dev


Servidor:


http://localhost:3001


Swagger:


http://localhost:3001/api-docs



## Aclaracion sobre la base de datos

en el archivo `Dump.sql` original, la columna que indica si un turno fue atendido aparece escrita como atentido.

El proyecto utiliza el nombre corregido `atendido`.




## Login


POST /v1/auth/login



{
  "email": "ejem@correo.com",
  "contrasenia": "buscar la q corresponde en bd"
}


Para utilizar las rutas protegidas se debe enviar el token:


Authorization: Bearer token


Roles:

- Medico: 1
- Paciente: 2
- Administrador: 3

## Paciente


GET /v1/turnos/paciente
GET /v1/especialidades
GET /v1/medicos
GET /v1/medicos/especialidad/1
POST /v1/turnos


Ejemplo para crear un turno:


{
  "id_medico": 1,
  "id_obra_social": 1,
  "fecha_hora": "2027-01-15T10:30:00"
}


## Medico

GET /v1/turnos/medico
GET /v1/medicos
PATCH /v1/turnos/1/atendido
PATCH /v1/turnos/1/observaciones


Ejemplo de observacion:


{
  "observaciones": "paciente atendido. Se indica reposo."
}


## Administrador


GET /v1/admin/administrador
POST /v1/admin/turnos
GET /v1/admin/estadisticas/atenciones
GET /v1/admin/informes/turnos/pdf
POST /v1/admin/uploads

POST /v1/especialidades
PUT /v1/especialidades/1
DELETE /v1/especialidades/1

GET /v1/obras-sociales
POST /v1/obras-sociales
PUT /v1/obras-sociales/1
DELETE /v1/obras-sociales/1

PUT /v1/admin/medicos/1/especialidad
POST /v1/admin/medicos/1/obras-sociales
POST /v1/admin/pacientes/1/obras-sociales
```

El informe PDF se descarga desde:

```http
GET /v1/admin/informes/turnos/pdf
```
