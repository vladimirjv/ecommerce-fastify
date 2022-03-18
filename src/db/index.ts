import { PrismaClient } from '@prisma/client';
import { FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin';

declare module 'fastify' {
  interface FastifyRequest {
  }
  interface FastifyReply {
  }
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

// define options
export interface PrismaPluginOptions {
}


export const PrismaPlugin: FastifyPluginCallback<PrismaPluginOptions> = (instance, opts, done) => {
  const prismaClient = new PrismaClient();
  instance.decorate('prisma', prismaClient);
  done();
}

// module.exports = fp(PrismaPlugin, '3.x')