import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Gestion de Turnos Medicos',
            version: '1.0.0',
            description: 'Documentacion de la API para el Trabajo Practico Final',
        },
        servers: [
            {
                url: 'http://localhost:3001',
                description: 'Servidor local',
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
    apis: ['./routes/v1/*.js'],
};

const specs = swaggerJsdoc(options);
export default specs;
