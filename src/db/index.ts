import { PrismaClient } from "@prisma/client";
import { FastifyPluginCallback } from "fastify";

export interface PrismaPluginOptions {}

export const PrismaPlugin: FastifyPluginCallback<PrismaPluginOptions> = (
  instance,
  opts,
  done
) => {
  const prismaClient = new PrismaClient();
  instance.decorate("prisma", prismaClient);
  done();
};
