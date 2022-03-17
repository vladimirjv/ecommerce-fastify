import { JSONSchema7 } from "json-schema";


export const CategorySchemaBase: JSONSchema7 = {
  $id: 'categorySchemas/base',
  type: 'object',
  title: 'Base Category schema',
  description: 'Base Category schema',
  properties: { 
    id: { type: 'string'},
    name: { type: 'string',},
    created_at: { type: 'string'},
    updated_at: { type: 'string'},
  },
   not: { required: ['id']}
}