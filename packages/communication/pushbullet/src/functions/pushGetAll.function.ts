import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PushGetAllInput = z.object({
  q: z.string().optional(),
})

export const PushGetAllOutput = z.record(z.string(), z.unknown())

export const pushGetAll = pikkuSessionlessFunc({
  description: "Push get all",
  input: PushGetAllInput,
  output: PushGetAllOutput,
  func: async ({ pushbullet }, data) => {
    return pushbullet.call("GET", "/pushes", data) as any
  },
})
