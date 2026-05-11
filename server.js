import express from 'express';
import dotenv from 'dotenv';
import db from './config/db.js';

import authRoutes from './routes/v1/auth.routes.js';
import adminRoutes from './routes/v1/admin.js';
import medicoRoutes from './routes/v1/medico.js';
import pacienteRoutes from './routes/v1/paciente.js';

import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './config/swagger.js';

//  variables de entorno
dotenv.config();

const app = express();

//  middleware de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));



//  parseo JSON
app.use(express.json());

//  rutas
app.use('/v1/auth', authRoutes);
app.use('/v1/admin', adminRoutes);
app.use('/v1/medico', medicoRoutes);
app.use('/v1/paciente', pacienteRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log('----------------------------------------------------------------------');
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Documentación disponible en http://localhost:${PORT}/api-docs`);
    console.log('----------------------------------------------------------------------');

});