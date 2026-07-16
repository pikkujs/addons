import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const VoiceSendInput = z.object({
  body: z.string().optional(),
})

export const VoiceSendOutput = z.record(z.string(), z.unknown())

export const voiceSend = pikkuSessionlessFunc({
  description: "Voice send",
  input: VoiceSendInput,
  output: VoiceSendOutput,
  func: async ({ mocean }, data) => {
    return mocean.call("POST", "/rest/2/voice", data) as any
  },
})
