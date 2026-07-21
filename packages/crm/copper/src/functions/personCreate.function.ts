import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PersonCreateInput = z.object({
  name: z.string().optional(),
  details: z.string().optional(),
  title: z.string().optional(),
})

export const PersonCreateOutput = z.record(z.string(), z.unknown())

export const personCreate = pikkuSessionlessFunc({
  description: "Create a person",
  input: PersonCreateInput,
  output: PersonCreateOutput,
  func: async ({ copper }, data) => {
    return copper.call("POST", "/people", data) as any
  },
})
