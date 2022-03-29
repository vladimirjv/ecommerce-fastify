import { FastifyPluginCallback } from 'fastify';
import { productsRoutes as ProductRoutes } from "./product";
import { categoriesRoutes as CategoriesRoutes } from "./category";
import { adminRoutes as AdminRoutes } from "./admin";

export const routesModule: FastifyPluginCallback =async (fastify, opts, done) => {
  fastify
    .register(AdminRoutes)
    .register(ProductRoutes)
    .register(CategoriesRoutes);
  done();
}