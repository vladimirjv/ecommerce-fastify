import type { FastifyInstance } from "fastify";
import { readdirSync } from "fs";
import { join } from "path";

const thisFileName = __filename.split("/").pop();
const files = readdirSync(join(__dirname)).filter(el => el !== thisFileName);

export function addSchemas(instance: FastifyInstance) {
  if (files) {
    files.forEach(async (file) => {
      const schemaDefinition = await import(`./${file}`);
      if (schemaDefinition) {
        Object.keys(schemaDefinition).forEach((schema) => {
          instance.log.info(`Schema added: ${JSON.stringify(schemaDefinition[schema], null, 2)}`);
          instance.addSchema(schemaDefinition[schema])
        })
      }

    })
  }
}
