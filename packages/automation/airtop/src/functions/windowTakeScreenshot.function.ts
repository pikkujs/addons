import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const WindowTakeScreenshotInput = z.object({
  sessionId: z.string(),
  windowId: z.string(),
})

export const WindowTakeScreenshotOutput = z.record(z.string(), z.unknown())

export const windowTakeScreenshot = pikkuSessionlessFunc({
  description: "Take a screenshot of a window",
  input: WindowTakeScreenshotInput,
  output: WindowTakeScreenshotOutput,
  func: async ({ airtop }, data) => {
    return airtop.call("POST", "/sessions/{sessionId}/windows/{windowId}/screenshot", data) as any
  },
})
