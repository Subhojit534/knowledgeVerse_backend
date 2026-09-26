import swaggerJsdoc from 'swagger-jsdoc';
import fs from 'fs';
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'KnowledgeVerse API',
      version: '1.0.0',
      description: 'API Documentation for KnowledgeVerse Backend',
    },
    servers: [{ url: 'http://127.0.0.1:8000', description: 'Local Development Server' }],
    components: {
      securitySchemes: { bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' } },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routes/*.ts'],
};
const swaggerSpec = swaggerJsdoc(options);
fs.writeFileSync('./swagger.json', JSON.stringify(swaggerSpec, null, 2));
console.log('Generated swagger.json');
