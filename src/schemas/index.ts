import { FastifyInstance } from "fastify";
import CategoryBaseSchema from "../../schemas/CategoryBaseSchema.json";
import { JSONSchema7 } from "json-schema";


export function addSchemas(instance: FastifyInstance) {
  instance.addSchema(CategoryBaseSchema as JSONSchema7);
  // instance.addSchema(CategoryBaseSchema.properties.Category as JSONSchema7);
  //instance.addSchema(CategoryBaseSchema.properties.CategoryParamId as JSONSchema7);
  // instance.addSchema(CategoryBaseSchema.properties.CategoryUpdateBody as JSONSchema7);
}
