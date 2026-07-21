import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ExtractionQueryInput = z.object({
  sessionId: z.string(),
  windowId: z.string(),
  prompt: z.string().optional(),
})

export const ExtractionQueryOutput = z.record(z.string(), z.unknown())

export const extractionQuery = pikkuSessionlessFunc({
  description: "Query a page",
  input: ExtractionQueryInput,
  output: ExtractionQueryOutput,
  func: async ({ airtop }, data) => {
    return airtop.call("POST", "/sessions/{sessionId}/windows/{windowId}/page-query", data) as any
  },
})
