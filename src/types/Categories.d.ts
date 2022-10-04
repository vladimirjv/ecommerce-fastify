import {
  CategoryDeleteBodySchema,
  CategoryParamIdSchema,
  CategoryPostBodySchema,
  CategorySchema,
  CategoryUpdateBodySchema
} from "@/schemas/CategorySchemas";
import { FromSchema } from "json-schema-to-ts";

export type Category = FromSchema<typeof CategorySchema>;
export type CategoryParamId = FromSchema<typeof CategoryParamIdSchema>;
export type CategoryPostBody = FromSchema<typeof CategoryPostBodySchema>;
export type CategoryUpdateBody = FromSchema<typeof CategoryUpdateBodySchema>;
export type CategoryDeleteBody = FromSchema<typeof CategoryDeleteBodySchema>;
