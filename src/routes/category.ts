import { FastifyPluginCallback, FastifyReply, FastifyRequest, RouteShorthandOptions, RouteShorthandOptionsWithHandler } from "fastify";
import { CategoryController } from "../controllers";
import {
  CategoryParamId,
  CategoryPostBody,
  CategoryUpdateBody
} from "../schemas/types/CategoryBaseSchema";

export const categoriesRoutes: FastifyPluginCallback = async (
  fastify,
  options,
  done
) => {
  const categoryController = new CategoryController(fastify.prisma);

  // GET ALL Categories
  fastify.get(
    "/categories",
    {
      preHandler: fastify.auth([fastify.authenticate])
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const cat = await categoryController.getCategories();
      reply.send(cat);
    }
  );

  // CREATE Category
  fastify.post<{ Body: CategoryPostBody }>(
    "/categories",
    {
      schema: {
        body: { $ref: "CategoryPostBody#" }
      }
    },
    async (request, reply) => {
      const body = request.body;
      const newCategory = await categoryController.createCategory(body);
      reply.send(newCategory);
    }
  );

  // GET ONE Category
  fastify.get<{ Params: CategoryParamId }>("/categories/:categoryID", async (request, reply) => {
    const { categoryID } = request.params;
    const category = await categoryController.getCategoryByID(Number(categoryID));
    console.log(category);
    reply.send(category);
  });

  //UPDATE Category
  fastify.put<{ Params: CategoryParamId; Body: CategoryUpdateBody }>(
    "/categories/:categoryID",
    {
      schema: { 
        params: { $ref: "CategoryParamId#"},
        body: { $ref: "CategoryUpdateBody#"},
      }
    },
    async (request, reply) => {
      const { categoryID } = request.params;
      const category = await categoryController.updateCategory(Number(categoryID), request.body);
      reply.send(category);
    }
  );

  //DELETE Category
  fastify.delete<{ Params: CategoryParamId }>("/categories/:categoryID", {
    schema: { 
      params: { $ref: "CategoryParamId#"},
    }
  }, async (request, reply) => {
    const { categoryID } = request.params
    try {
      const deletedCategory = await categoryController.deleteCategory(Number(categoryID));
      reply.send(deletedCategory);
    } catch (error: any) {
      reply.notFound(error.message);
    }
  })

  done();
};

