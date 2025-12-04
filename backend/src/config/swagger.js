import swaggerJsdoc from 'swagger-jsdoc';
import { config } from './env.js';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Recipe API',
      version: '1.0.0',
      description: 'Recipe management API with authentication',
    },
    servers: [
      {
        url: `http://localhost:${config.PORT}`,
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Recipe: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            category: { type: 'string' },
            description: { type: 'string' },
            ingredients: {
              type: 'array',
              items: { type: 'string' },
            },
            instructions: {
              type: 'array',
              items: { type: 'string' },
            },
          },
        },
        Category: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

export const swaggerSpec = swaggerJsdoc(options);