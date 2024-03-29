
/**
 * @constant
 * @type {import("json-schema-to-ts").JSONSchema7}
 */
export const CategorySchema = {
  $id: "http://example.com/schemas/category.json/CategoryBase",
  type: "object",
  properties: {
    id: { type: "number" },
    name: { type: "string" },
    created_at: { type: "string" },
    updated_at: { type: "string" },
    // productsIDs: { type: "array", items: { type: "string" } }
  },
  // required: ["name", "created_at"],
  additionalProperties: false,
} as const

/**
 * @constant
 * @type {import("json-schema-to-ts").JSONSchema7}
 */
export const CategoryParamIdSchema = {
  $id: "http://example.com/schemas/category.json/CategoryParamId",
  type: "object",
  properties: {
    categoryID: { type: "string" }
  },
  required: ["categoryID"],
  additionalProperties: false
} as const;

/**
 * @constant
 * @type {import("json-schema-to-ts").JSONSchema7}
 */
export const CategoryPostBodySchema = {
  $id: "http://example.com/schemas/category.json/CategoryPostBody",
  type: "object",
  properties: {
    name: { type: "string" },
  },
  required: ["name"],
  additionalProperties: false
} as const;

/**
 * @constant
 * @type {import("json-schema-to-ts").JSONSchema7}
 */
export const CategoryUpdateBodySchema = {
  $id: "http://example.com/schemas/category.json/CategoryUpdateBody",
  type: "object",
  properties: {
    id: { type: "number" },
    name: { type: "string" }
  },
  required: ["id"],
  additionalProperties: false
} as const;

/**
 * @constant
 * @type {import("json-schema-to-ts").JSONSchema7}
 */
export const CategoryDeleteBodySchema = {
  $id: "http://example.com/schemas/category.json/CategoryDeleteBodySchema",
  type: "object",
  properties: {
    id: { type: "number" },
  },
  required: ["id"],
  additionalProperties: false
} as const;

// export default {
//   CategorySchema,
//   CategoryParamIdSchema,
//   CategoryPostBodySchema,
//   CategoryUpdateBodySchema,
//   CategoryDeleteBodySchema,
// };
