import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PushCreateInput = z.object({
  body: z.string().optional(),
})

export const PushCreateOutput = z.record(z.string(), z.unknown())

export const pushCreate = pikkuSessionlessFunc({
  description: "Push create",
  input: PushCreateInput,
  output: PushCreateOutput,
  func: async ({ pushbullet }, data) => {
    return pushbullet.call("POST", "/pushes", data) as any
  },
})
