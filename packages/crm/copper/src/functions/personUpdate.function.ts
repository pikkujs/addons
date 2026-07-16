import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PersonUpdateInput = z.object({
  personId: z.string(),
  name: z.string().optional(),
  details: z.string().optional(),
  title: z.string().optional(),
})

export const PersonUpdateOutput = z.record(z.string(), z.unknown())

export const personUpdate = pikkuSessionlessFunc({
  description: "Update a person",
  input: PersonUpdateInput,
  output: PersonUpdateOutput,
  func: async ({ copper }, data) => {
    return copper.call("PUT", "/people/{personId}", data) as any
  },
})
