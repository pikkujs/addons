import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const IntegrationCreateInput = z.object({
  title: z.string().max(128).describe("Integration Name - Default BASE will be null by default"),
  config: z.unknown().describe("Source Configuration"),
  meta: z.unknown().optional().describe("Integration metas"),
  type: z.enum(["database", "ai", "auth", "sync", "communication", "spread-sheet", "project-management", "crm", "marketing", "ats", "development", "finance", "ticketing", "storage", "others", "workflow-node"]).describe("Integration Type"),
  sub_type: z.string().optional().describe("Sub Type"),
  copy_from_id: z.union([z.string(), z.unknown()]).optional().describe("ID of integration to be copied from. Used in Copy Integration."),
})

export const IntegrationCreateOutput = z.object({
  title: z.union([z.string(), z.unknown()]).optional().describe("Source Name - Default BASE will be null by default"),
  config: z.unknown().optional().describe("Source Configuration"),
  enabled: z.union([z.number().int(), z.boolean(), z.unknown()]).optional().describe("Is this Intgration enabled"),
  id: z.string().optional().describe("Unique Integration ID"),
  fk_workspace_id: z.string().optional().describe("Unique Workspace ID"),
  order: z.number().optional().describe("The order of the list of sources"),
  base_id: z.string().optional().describe("The base ID that this source belongs to"),
  is_private: z.union([z.number().int(), z.boolean(), z.unknown()]).optional().describe("Model for Bool"),
  is_default: z.union([z.number().int(), z.boolean(), z.unknown()]).optional().describe("Model for Bool"),
  type: z.enum(["database", "ai", "auth", "sync", "communication", "spread-sheet", "project-management", "crm", "marketing", "ats", "development", "finance", "ticketing", "storage", "others", "workflow-node"]).optional().describe("Integration Type"),
  sub_type: z.string().optional().describe("DB Type"),
  created_by: z.string().optional().describe("DB Type"),
}).describe("Model for Integration")

export const integrationCreate = pikkuSessionlessFunc({
  description: "Create integration",
  input: IntegrationCreateInput,
  output: IntegrationCreateOutput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v2/meta/integrations", data) as any
  },
})
