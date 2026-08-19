import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ExtractionGetPaginatedInput = z.object({
  sessionId: z.string(),
  windowId: z.string(),
  prompt: z.string().optional(),
})

export const ExtractionGetPaginatedOutput = z.record(z.string(), z.unknown())

export const extractionGetPaginated = pikkuSessionlessFunc({
  description: "Extract paginated data",
  input: ExtractionGetPaginatedInput,
  output: ExtractionGetPaginatedOutput,
  func: async ({ airtop }, data) => {
    return airtop.call("POST", "/sessions/{sessionId}/windows/{windowId}/paginated-extraction", data) as any
  },
})
