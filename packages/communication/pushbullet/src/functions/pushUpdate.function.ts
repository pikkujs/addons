import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PushUpdateInput = z.object({
  body: z.string().optional(),
})

export const PushUpdateOutput = z.record(z.string(), z.unknown())

export const pushUpdate = pikkuSessionlessFunc({
  description: "Push update",
  input: PushUpdateInput,
  output: PushUpdateOutput,
  func: async ({ pushbullet }, data) => {
    return pushbullet.call("POST", "/pushes/{id}", data) as any
  },
})
