import fastify, { FastifyInstance } from "fastify";
import { routesModule } from "./routes";

const server: FastifyInstance = fastify({});

server.get("/ping", async (request, reply) => {
  return "pong\n";
});

server.register(routesModule, { prefix: "/api" });
// server.register(ProductRoutes, CategoriesRoutes)

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
