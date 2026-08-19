import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const SessionTerminateInput = z.object({
  sessionId: z.string(),
})

export const SessionTerminateOutput = z.record(z.string(), z.unknown())

export const sessionTerminate = pikkuSessionlessFunc({
  description: "Terminate a session",
  input: SessionTerminateInput,
  output: SessionTerminateOutput,
  func: async ({ airtop }, data) => {
    return airtop.call("DELETE", "/sessions/{sessionId}", data) as any
  },
})
