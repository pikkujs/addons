import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const WindowCloseInput = z.object({
  sessionId: z.string(),
  windowId: z.string(),
})

export const WindowCloseOutput = z.record(z.string(), z.unknown())

export const windowClose = pikkuSessionlessFunc({
  description: "Close a window",
  input: WindowCloseInput,
  output: WindowCloseOutput,
  func: async ({ airtop }, data) => {
    return airtop.call("DELETE", "/sessions/{sessionId}/windows/{windowId}", data) as any
  },
})
