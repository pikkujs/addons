import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const PushInput = z.object({
  body: z.string().optional(),
})

export const PushOutput = z.record(z.string(), z.unknown())

export const push = pikkuSessionlessFunc({
  description: "Push",
  input: PushInput,
  output: PushOutput,
  func: async ({ googleFirebaseRealtimeDatabase }, data) => {
    return googleFirebaseRealtimeDatabase.call("POST", "/push", data) as any
  },
})
