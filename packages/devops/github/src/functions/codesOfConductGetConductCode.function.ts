// codes-of-conduct — Insight into codes of conduct for your communities.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError } from '@pikku/core/errors'

export const CodesOfConductGetConductCodeInput = z.object({
  key: z.string(),
})

export const CodesOfConductGetConductCodeOutput = z.object({
  body: z.string().optional(),
  html_url: z.string().url().nullable(),
  key: z.string(),
  name: z.string(),
  url: z.string().url(),
}).describe("Code Of Conduct")

export const codesOfConductGetConductCode = pikkuSessionlessFunc({
  input: CodesOfConductGetConductCodeInput,
  output: CodesOfConductGetConductCodeOutput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/codes_of_conduct/{key}", data) as any
  },
})
