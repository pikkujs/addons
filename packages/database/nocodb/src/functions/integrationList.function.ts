import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const IntegrationListInput = z.object({
  type: z.enum(["database", "ai", "auth", "sync", "communication", "spread-sheet", "project-management", "crm", "marketing", "ats", "development", "finance", "ticketing", "storage", "others", "workflow-node"]).optional().describe("Integration Type"),
  includeDatabaseInfo: z.boolean().optional(),
  limit: z.number().optional(),
  offset: z.number().optional(),
  baseId: z.string().optional(),
  query: z.string().optional(),
})

export const IntegrationListOutput = z.unknown()

export const integrationList = pikkuSessionlessFunc({
  description: "List integrations",
  input: IntegrationListInput,
  output: IntegrationListOutput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v2/meta/integrations", data) as any
  },
})
