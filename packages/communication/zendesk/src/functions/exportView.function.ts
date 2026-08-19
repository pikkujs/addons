import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ExportViewInput = z.object({
  view_id: z.number().int().describe("The ID of the view. Example: 25"),
})

export const ExportViewOutput = z.object({
  export: z.object({
    status: z.string().optional(),
    view_id: z.number().int().optional(),
  }).optional(),
})

export const exportView = pikkuSessionlessFunc({
  description: "Returns the csv attachment of the specified view if possible. Enqueues a job to produce the csv if necessary.\n\n#### Allowed For\n\n* Agents",
  input: ExportViewInput,
  output: ExportViewOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/views/{view_id}/export", data) as any
  },
})
