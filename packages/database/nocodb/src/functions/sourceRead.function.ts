import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const SourceReadInput = z.object({
  baseId: z.string().min(0).max(20).describe("Model for ID").describe("Unique Base ID"),
  sourceId: z.string().regex(new RegExp("ds_j04jmxh5xg10lu")).describe("Unique Source ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const SourceReadOutput = z.object({
  alias: z.union([z.string(), z.unknown()]).optional().describe("Source Name"),
  integration_title: z.union([z.string(), z.unknown()]).optional().describe("Integration Name"),
  fk_integration_id: z.union([z.string(), z.unknown()]).optional().describe("Integration Id"),
  config: z.unknown().optional().describe("Source Configuration"),
  enabled: z.union([z.number().int(), z.boolean(), z.unknown()]).optional().describe("Is this source enabled"),
  id: z.string().optional().describe("Unique Source ID"),
  inflection_column: z.string().optional().describe("Inflection for columns"),
  inflection_table: z.string().optional().describe("Inflection for tables"),
  is_meta: z.union([z.number().int(), z.boolean(), z.unknown()]).optional().describe("Is the data source connected externally"),
  is_local: z.union([z.number().int(), z.boolean(), z.unknown()]).optional().describe("Is the data source minimal db"),
  is_schema_readonly: z.union([z.number().int(), z.boolean(), z.unknown()]).optional().describe("Is the data source schema readonly"),
  is_data_readonly: z.union([z.number().int(), z.boolean(), z.unknown()]).optional().describe("Is the data source data readonly"),
  order: z.number().optional().describe("The order of the list of sources"),
  base_id: z.string().optional().describe("The base ID that this source belongs to"),
  type: z.enum(["mysql", "mysql2", "oracledb", "pg", "snowflake", "sqlite3", "databricks"]).optional().describe("DB Type"),
}).describe("Model for Source")

export const sourceRead = pikkuSessionlessFunc({
  description: "Get the source details of a given base",
  input: SourceReadInput,
  output: SourceReadOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/db/meta/projects/{baseId}/bases/{sourceId}", data) as any
  },
})
