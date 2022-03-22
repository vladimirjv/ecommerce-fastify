import { FastifyPluginCallback, FastifyReply, FastifyRequest } from "fastify";
import { RouteGenericInterface } from "fastify/types/route";
import { CategoryController } from "../controllers";
import { CategoryPostBodySchema } from "../schemas/types/CategoryPostBodySchema";

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

  fastify.post<{Body: CategoryPostBodySchema}>(
    "/categories",
    {
      schema: {
        body: { $ref: "CategoryPostBodySchema#" }
      }
    },
    async (request, reply) => {
      const body = request.body;
      const newCategory = await categoryController.createCategory(body);
      reply.send(newCategory);
    }
  );

  // const route: RouteGenericInterface = {
  //   Params: {}
  // }
  fastify.get<{Params: {categoryID: string}}>("/categories/:categoryID", async (request, reply) => {
    const { categoryID } =request.params
    const category = await categoryController.getCategoryByID(Number(categoryID));
    console.log(category);
    reply.send(category);
  })

  done();
};
