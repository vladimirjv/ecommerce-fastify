import { FastifyInstance } from "fastify";
import PostCategoryBodySchemaJSON from "../../schemas/CategoryPostBodySchema.json";
import CategorySchemaBaseJSON from "../../schemas/CategorySchema.json";
import { JSONSchema7 } from "json-schema";


export function addSchemas(instance: FastifyInstance) {
  instance.addSchema(CategorySchemaBaseJSON as JSONSchema7);
  instance.addSchema(PostCategoryBodySchemaJSON as JSONSchema7);
}
