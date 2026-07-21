import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const PersonGetInput = z.object({
  personId: z.string(),
})

export const PersonGetOutput = z.record(z.string(), z.unknown())

export const personGet = pikkuSessionlessFunc({
  description: "Get a person",
  input: PersonGetInput,
  output: PersonGetOutput,
  func: async ({ copper }, data) => {
    return copper.call("GET", "/people/{personId}", data) as any
  },
})
