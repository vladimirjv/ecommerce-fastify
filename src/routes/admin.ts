import { AdminController } from "@/controllers";
import { FastifyPluginCallback } from "fastify";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

export const adminRoutes: FastifyPluginCallback = async (
  fastify,
  options,
  done
) => {
  const adminController = new AdminController(fastify.prisma);

  // SIGN UP
  fastify.post("/admin/signup", {schema: {tags: ["admin"]}}, async (request, reply) => {
    try {
      const registeredUser = await adminController.register(request.body as any);
      reply.send(registeredUser);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") { // Unique constraint failed on the fields:
          const uniqueFailedField = (error.meta as any).target[0]; 
          reply.preconditionRequired(`Unique constraint failed on the fields: ${uniqueFailedField}`)
        }
      }
      reply.internalServerError(error as any);
    }
  });

  // GET users
  fastify.get("/admin/users", {schema: {tags: ["admin"]}}, async (request, reply) => {
    const users = await adminController.getUsers();
    reply.send(users);
  })

  fastify.post("/admin/login", {schema: {tags: ["admin"]}}, async (request, reply) => {
    try {
      const user = await adminController.login(request.body as any);
      reply.send(user);
    } catch (error) {
      throw error
    }
  })

  done();
};
