import { FastifyPluginCallback, FastifyReply, FastifyRequest } from "fastify";
import { CategoryController } from "../controllers";

export const categoriesRoutes: FastifyPluginCallback = async (
  fastify,
  options,
  done
) => {
  const categoryController = new CategoryController(fastify.prisma);

  fastify.get(
    "/categories",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const cat = await categoryController.getCategories();
      reply.send(cat);
    }
  );

  fastify.post(
    "/categories",
    {
      schema: {
        body: { $ref: "CategoryPostBodySchema#" }
      }
    },
    async (request, reply) => {
      const body = request.body;
      console.log(body);
      reply.send(body);
    }
  );

  done();
};
