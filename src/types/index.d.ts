import { PrismaClient } from "@prisma/client";

declare module 'fastify' {
  interface FastifyRequest {
  }
  interface FastifyReply {
  }
  interface FastifyInstance {
    prisma: PrismaClient;
    authenticate: any;
  }
}