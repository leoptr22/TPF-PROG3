import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Gestión de Turnos Médicos',
            version: '1.0.0',
            description: 'Documentación de la API para el Trabajo Práctico Final',
        },
        servers: [
            {
                url: 'http://localhost:3001',
                description: 'Servidor Local',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    // Rutas  para documentar
    apis: ['./routes/v1/*.js', './controllers/**/*.js', './services/**/*.js', './middlewares/**/*.js'], 
};

const specs = swaggerJsdoc(options);
export default specs;