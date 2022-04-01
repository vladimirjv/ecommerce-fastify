import { FastifyPluginCallback, FastifyReply, FastifyRequest } from "fastify";

export const productsRoutes: FastifyPluginCallback = async (
  fastify,
  options,
  done
) => {
  fastify.get(
    "/products",
    {
      schema: { tags: ["products"] },
      preHandler: fastify.auth([fastify.authenticate])
    },
    (request: FastifyRequest, reply: FastifyReply) => {
      reply.send("Hello Products");
    }
  );
  done();
};
