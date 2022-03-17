import { FastifyPluginCallback, FastifyReply, FastifyRequest } from "fastify";

export const productsRoutes: FastifyPluginCallback = async (
  fastify,
  options,
  done
) => {
  fastify.get("/products", (request: FastifyRequest, reply: FastifyReply) => {
    reply.send("Hello Products");
  });
  done();
};
