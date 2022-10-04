import CategoryBaseSchema from "../../schemas/CategoryBaseSchema.json";
import type { FastifyInstance } from "fastify";
import {
  CategorySchema,
  CategoryParamIdSchema,
  CategoryPostBodySchema,
  CategoryUpdateBodySchema,
  CategoryDeleteBodySchema
} from "./CategorySchemas";

export function addSchemas(instance: FastifyInstance) {
  // instance.addSchema(CategoryBaseSchema);
  instance.addSchema(CategorySchema);
  instance.addSchema(CategoryParamIdSchema);
  instance.addSchema(CategoryPostBodySchema);
  instance.addSchema(CategoryUpdateBodySchema);
  instance.addSchema(CategoryDeleteBodySchema);
}
