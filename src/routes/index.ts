import { FastifyPluginCallback } from 'fastify';
import { productsRoutes as ProductRoutes } from "./product";
import { categoriesRoutes as CategoriesRoutes } from "./category";

export const routesModule: FastifyPluginCallback =async (fastify, opts, done) => {
  fastify
    .register(ProductRoutes)
    .register(CategoriesRoutes);
  done();
}