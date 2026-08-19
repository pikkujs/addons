import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ExportDataInput = z.object({
  viewId: z.string().min(0).max(20).describe("Model for ID").describe("Unique View ID"),
  exportAs: z.literal("csv").describe("Export as format"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  body: z.record(z.string(), z.unknown()),
})

export const exportData = pikkuSessionlessFunc({
  description: "Trigger export as job",
  input: ExportDataInput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v2/export/{viewId}/{exportAs}", data)
  },
})
