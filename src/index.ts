import fastify, { FastifyInstance } from "fastify";
import { routesModule } from "./routes";
import { PrismaPlugin } from "./db";
import { addSchemas } from "./schemas";

const server: FastifyInstance = fastify({});
// Register plugins
server.register(require('fastify-auth0-verify'),{
  domain: "vladimirjv.us.auth0.com",
  audience: "ecommerce",
})
server.register(PrismaPlugin)
addSchemas(server);
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
