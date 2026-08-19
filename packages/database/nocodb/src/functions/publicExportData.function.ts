import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PublicExportDataInput = z.object({
  publicDataUuid: z.string().min(0).max(20).describe("Model for ID").describe("Unique View ID"),
  exportAs: z.literal("csv").describe("Export as format"),
  body: z.record(z.string(), z.unknown()),
})

export const publicExportData = pikkuSessionlessFunc({
  description: "Trigger export as job",
  input: PublicExportDataInput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v2/public/export/{publicDataUuid}/{exportAs}", data)
  },
})
