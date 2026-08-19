import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const WindowLoadInput = z.object({
  sessionId: z.string(),
  windowId: z.string(),
  url: z.string().optional(),
})

export const WindowLoadOutput = z.record(z.string(), z.unknown())

export const windowLoad = pikkuSessionlessFunc({
  description: "Load a URL in a window",
  input: WindowLoadInput,
  output: WindowLoadOutput,
  func: async ({ airtop }, data) => {
    return airtop.call("POST", "/sessions/{sessionId}/windows/{windowId}", data) as any
  },
})
