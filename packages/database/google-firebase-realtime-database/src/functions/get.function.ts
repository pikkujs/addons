import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GetInput = z.object({
  q: z.string().optional(),
})

export const GetOutput = z.record(z.string(), z.unknown())

export const get = pikkuSessionlessFunc({
  description: "Get",
  input: GetInput,
  output: GetOutput,
  func: async ({ googleFirebaseRealtimeDatabase }, data) => {
    return googleFirebaseRealtimeDatabase.call("GET", "/get", data) as any
  },
})
