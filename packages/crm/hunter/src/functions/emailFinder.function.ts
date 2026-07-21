import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const EmailFinderInput = z.object({
  domain: z.string(),
  first_name: z.string(),
  last_name: z.string(),
})

export const EmailFinderOutput = z.record(z.string(), z.unknown())

export const emailFinder = pikkuSessionlessFunc({
  description: "Find the most likely email address from a domain, a first name and a last name",
  input: EmailFinderInput,
  output: EmailFinderOutput,
  func: async ({ hunter }, data) => {
    return hunter.call("GET", "/email-finder", data) as any
  },
})
