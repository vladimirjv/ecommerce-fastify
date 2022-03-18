import { FastifyInstance } from "fastify";
import PostCAtegoryBodySchemaJSON from "../../schemas/CategoryPostBodySchema.json";
import CategorySchemaBaseJSON from "../../schemas/CategorySchema.json";
import { JSONSchema7 } from "json-schema";


export function addSchemas(instance: FastifyInstance) {
  instance.addSchema(CategorySchemaBaseJSON as JSONSchema7);
  instance.addSchema(PostCAtegoryBodySchemaJSON as JSONSchema7);
}
