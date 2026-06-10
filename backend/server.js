import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './routes/v1/auth.routes.js';
import adminRoutes from './routes/v1/admin.js';
import medicoRoutes from './routes/v1/medico.js';
import pacienteRoutes from './routes/v1/paciente.js';
import turnosRoutes from './routes/v1/turnos.js';
import especialidadesRoutes from './routes/v1/especialidades.js';
import medicosRoutes from './routes/v1/medicos.js';
import obrasSocialesRoutes from './routes/v1/obrasSociales.js';

import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './config/swagger.js';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use(express.json());

app.use('/v1/auth', authRoutes);
app.use('/v1/admin', adminRoutes);
app.use('/v1/medico', medicoRoutes);
app.use('/v1/paciente', pacienteRoutes);
app.use('/v1/turnos', turnosRoutes);
app.use('/v1/especialidades', especialidadesRoutes);
app.use('/v1/medicos', medicosRoutes);
app.use('/v1/obras-sociales', obrasSocialesRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Documentacion disponible en http://localhost:${PORT}/api-docs`);
});
