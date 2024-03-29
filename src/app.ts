import "dotenv/config";
import type types from "./types";
import fastify, { FastifyInstance } from "fastify";
import FastifySensible from "fastify-sensible";
import fastifyAuth from "fastify-auth";
import fastifyJwt from "fastify-jwt";
import fastifySwagger from "fastify-swagger";
import { addSchemas } from "./schemas";
import { PrismaPlugin } from "./db";
import { addDecorators } from "./decorators";
import { routesModule } from "./routes";
import { swaggerConfig } from "./docs/config";
import { logger, accessTokenSecret } from "./constants";

// Instance created
const server: FastifyInstance = fastify({ logger });
// const server = fastify().withTypeProvider<JsonSchemaToTsProvider>()
// Add global schemas
addSchemas(server);
// Register Plugins
server.register(PrismaPlugin);
server.register(FastifySensible);
server.register(fastifyJwt, { secret: accessTokenSecret });
// Add decorators
addDecorators(server);
// ADD routes and documentation routes
server.register(fastifyAuth).after(() => {
  server.register(fastifySwagger, { ...swaggerConfig });
  server.register(routesModule, { prefix: "/api" });
});

export { server };
