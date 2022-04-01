
import { SwaggerOptions } from "fastify-swagger";

export const swaggerConfig: SwaggerOptions = {
  routePrefix: "/docs",
  swagger: {
    info: {
      title: 'API Documentation',
      description: 'This is the swagger documentation for the api',
      version: '0.1.0'
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here'
    },
    host: 'localhost',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      { name: 'admin', description: 'Admin related end-points' },
      { name: 'user', description: 'User related end-points' },
      { name: 'category', description: 'Categories related end-points' },
      { name: 'products', description: 'Products related end-points' },
    ],
    securityDefinitions: {
      apiKey: {
        type: 'apiKey',
        name: 'apiKey',
        in: 'header'
      }
    }
  },
  uiConfig: {
    docExpansion: 'full',
    deepLinking: true
  },
  uiHooks: {
    onRequest: function (request, reply, next) { next() },
    preHandler: function (request, reply, next) { next() }
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  exposeRoute: true
}