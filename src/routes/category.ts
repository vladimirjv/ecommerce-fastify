import { FastifyPluginCallback, FastifyReply, FastifyRequest } from "fastify";
import { CategoryController } from "@/controllers";
import type { CategoryParamId, CategoryPostBody, CategoryUpdateBody } from "@/types/Categories";

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
      preHandler: fastify.auth([fastify.authenticate]),
      schema: {
        tags: ["category"],
        response: {
          200: {
            type: "array",
            items: { $ref: "http://example.com/schemas/category.json/CategoryBase" }
          }
        }
      }
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
        body: { $ref: "http://example.com/schemas/category.json/CategoryPostBody" },
        response: {
          200: { $ref: "http://example.com/schemas/category.json/CategoryBase" }
        },
        tags: ["category"]
      },
      preHandler: fastify.auth([fastify.authenticate])
    },
    async (request, reply) => {
      const body = request.body;
      const newCategory = await categoryController.createCategory(body);
      reply.send(newCategory);
    }
  );

  // GET ONE Category
  fastify.get<{ Params: CategoryParamId }>(
    "/categories/:categoryID",
    {
      preHandler: fastify.auth([fastify.authenticate]),
      schema: {
        tags: ["category"],
        response: {
          200: { $ref: "http://example.com/schemas/category.json/CategoryBase" }
        }
      }
    },
    async (request, reply) => {
      const { categoryID } = request.params;
      const category = await categoryController.getCategoryByID(
        Number(categoryID)
      );
      reply.send(category);
    }
  );

  //UPDATE Category
  fastify.put<{ Params: CategoryParamId; Body: CategoryUpdateBody }>(
    "/categories/:categoryID",
    {
      preHandler: fastify.auth([fastify.authenticate]),
      schema: {
        params: { $ref: "http://example.com/schemas/category.json/CategoryParamId" },
        body: { $ref: "http://example.com/schemas/category.json/CategoryUpdateBody" },
        tags: ["category"]
      }
    },
    async (request, reply) => {
      const { categoryID } = request.params;
      const category = await categoryController.updateCategory(
        Number(categoryID),
        request.body
      );
      reply.send(category);
    }
  );

  //DELETE Category
  fastify.delete<{ Params: CategoryParamId }>(
    "/categories/:categoryID",
    {
      schema: {
        params: { $ref: "http://example.com/schemas/category.json/CategoryParamId" },
        tags: ["category"]
      },
      preHandler: fastify.auth([fastify.authenticate])
    },
    async (request, reply) => {
      const { categoryID } = request.params;
      try {
        const deletedCategory = await categoryController.deleteCategory(
          Number(categoryID)
        );
        reply.send(deletedCategory);
      } catch (error: any) {
        reply.notFound(error.message);
      }
    }
  );

  done();
};
