import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PersonDeleteInput = z.object({
  personId: z.string(),
})

export const PersonDeleteOutput = z.record(z.string(), z.unknown())

export const personDelete = pikkuSessionlessFunc({
  description: "Delete a person",
  input: PersonDeleteInput,
  output: PersonDeleteOutput,
  func: async ({ copper }, data) => {
    return copper.call("DELETE", "/people/{personId}", data) as any
  },
})
