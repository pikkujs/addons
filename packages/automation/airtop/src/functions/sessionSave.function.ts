import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SessionSaveInput = z.object({
  sessionId: z.string(),
  profileName: z.string(),
})

export const SessionSaveOutput = z.record(z.string(), z.unknown())

export const sessionSave = pikkuSessionlessFunc({
  description: "Save profile on session termination",
  input: SessionSaveInput,
  output: SessionSaveOutput,
  func: async ({ airtop }, data) => {
    return airtop.call("PUT", "/sessions/{sessionId}/save-profile-on-termination/{profileName}", data) as any
  },
})
