import { FastifyInstance } from "fastify";
import CategoryBaseSchema from "../../schemas/CategoryBaseSchema.json";
import { JSONSchema7 } from "json-schema";


export function addSchemas(instance: FastifyInstance) {
  instance.addSchema(CategoryBaseSchema as JSONSchema7);
}
