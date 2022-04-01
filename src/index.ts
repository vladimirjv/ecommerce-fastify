import fastify, { FastifyInstance } from "fastify";
import FastifySensible from "fastify-sensible";
import fastifyAauth from "fastify-auth";
import fastifyJwt from "fastify-jwt";
import fastifySwagger from "fastify-swagger";
import { PrismaPlugin } from "./db";
import { addSchemas } from "./schemas";
import { routesModule } from "./routes";
import "dotenv/config";
import { authenticateDecorator } from "./utils/jwt";
import types from "./types";
import { swaggerConfig } from "./docs/config";

const loggerOptions = { prettyPrint: true };
const logger = process.env["ENVIRONMENT"] === "development" ? loggerOptions : false;
const accessTokenSecret = process.env["ACCESS_TOKEN_SECRET"] as string;

const server: FastifyInstance = fastify({
  logger
});
addSchemas(server);
server.register(PrismaPlugin);
server.register(FastifySensible);

server.register(fastifyJwt, { secret: accessTokenSecret });
server.decorate("authenticate", authenticateDecorator);
server.register(fastifyAauth).after((err) => {
  server.register(fastifySwagger, {...swaggerConfig});
  server.register(routesModule, { prefix: "/api" });
});

server.get("/ping", async (request, reply) => {
  return "pong\n";
});

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
