const express = require('express');
require('dotenv').config();
const db = require('./config/db');

const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.js');
const medicoRoutes = require('./routes/medico.js');
const pacienteRoutes = require('./routes/paciente.js');

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/medico', medicoRoutes);
app.use('/paciente', pacienteRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
