import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const IntegrationReadInput = z.object({
  integrationId: z.string(),
  includeConfig: z.boolean().optional(),
  includeSources: z.boolean().optional(),
})

export const IntegrationReadOutput = z.object({
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

export const integrationRead = pikkuSessionlessFunc({
  description: "Read integration",
  input: IntegrationReadInput,
  output: IntegrationReadOutput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v2/meta/integrations/{integrationId}", data) as any
  },
})
