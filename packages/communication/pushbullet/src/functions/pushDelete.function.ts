import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PushDeleteInput = z.object({
  body: z.string().optional(),
})

export const PushDeleteOutput = z.record(z.string(), z.unknown())

export const pushDelete = pikkuSessionlessFunc({
  description: "Push delete",
  input: PushDeleteInput,
  output: PushDeleteOutput,
  func: async ({ pushbullet }, data) => {
    return pushbullet.call("DELETE", "/pushes/{id}", data) as any
  },
})
