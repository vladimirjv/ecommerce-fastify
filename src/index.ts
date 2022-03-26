import fastify, { FastifyInstance } from "fastify";
import { routesModule } from "./routes";
import { PrismaPlugin } from "./db";
import { addSchemas } from "./schemas";
import { env } from "process";
import "dotenv/config";

const loggerOptions = {
  prettyPrint: true,
};
const logger = env["ENVIRONMENT"] === "development" ? loggerOptions : false;

const server: FastifyInstance = fastify({
  logger,
});
// Register plugins
// server.register(require('fastify-auth0-verify'),{
//   domain: "vladimirjv.us.auth0.com",
//   audience: "ecommerce",
// })
addSchemas(server);
server.register(PrismaPlugin);
server.register(routesModule, { prefix: "/api" });

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
