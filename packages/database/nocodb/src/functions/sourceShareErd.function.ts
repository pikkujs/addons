import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const SourceShareErdInput = z.object({
  baseId: z.string(),
  sourceId: z.string(),
})

export const SourceShareErdOutput = z.object({
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

export const sourceShareErd = pikkuSessionlessFunc({
  input: SourceShareErdInput,
  output: SourceShareErdOutput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v1/db/meta/projects/{baseId}/bases/{sourceId}/share/erd", data) as any
  },
})
