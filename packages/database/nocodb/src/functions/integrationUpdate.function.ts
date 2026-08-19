import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const IntegrationUpdateInput = z.object({
  integrationId: z.string(),
  title: z.string().max(128).describe("Integration Name - Default BASE will be null by default"),
  config: z.unknown().describe("Source Configuration"),
  meta: z.unknown().optional().describe("Integration metas"),
  type: z.enum(["database", "ai", "auth", "sync", "communication", "spread-sheet", "project-management", "crm", "marketing", "ats", "development", "finance", "ticketing", "storage", "others", "workflow-node"]).describe("Integration Type"),
  sub_type: z.string().optional().describe("Sub Type"),
  copy_from_id: z.union([z.string(), z.unknown()]).optional().describe("ID of integration to be copied from. Used in Copy Integration."),
})

export const integrationUpdate = pikkuSessionlessFunc({
  description: "Update integration",
  input: IntegrationUpdateInput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("PATCH", "/api/v2/meta/integrations/{integrationId}", data)
  },
})
