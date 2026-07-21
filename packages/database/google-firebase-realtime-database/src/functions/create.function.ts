import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CreateInput = z.object({
  body: z.string().optional(),
})

export const CreateOutput = z.record(z.string(), z.unknown())

export const create = pikkuSessionlessFunc({
  description: "Create",
  input: CreateInput,
  output: CreateOutput,
  func: async ({ googleFirebaseRealtimeDatabase }, data) => {
    return googleFirebaseRealtimeDatabase.call("POST", "/create", data) as any
  },
})
