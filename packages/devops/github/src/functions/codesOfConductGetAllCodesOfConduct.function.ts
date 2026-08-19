// codes-of-conduct — Insight into codes of conduct for your communities.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CodesOfConductGetAllCodesOfConductOutput = z.array(z.object({
  body: z.string().optional(),
  html_url: z.string().url().nullable(),
  key: z.string(),
  name: z.string(),
  url: z.string().url(),
}))

export const codesOfConductGetAllCodesOfConduct = pikkuSessionlessFunc({
  output: CodesOfConductGetAllCodesOfConductOutput,
  func: async ({ github }) => {
    return github.call("GET", "/codes_of_conduct") as any
  },
})
