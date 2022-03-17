import { FastifyPluginCallback, FastifyReply, FastifyRequest } from "fastify";

export const categoriesRoutes: FastifyPluginCallback = async (
  fastify,
  options,
  done
) => {
  fastify.get("/categories", (request: FastifyRequest, reply: FastifyReply) => {
    reply.send("Hello Categories");
  });
  done();
};
