// meta — Endpoints that give information about the API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MetaGetOctocatInput = z.object({
  s: z.string().optional().describe("The words to show in Octocat's speech bubble"),
})

export const MetaGetOctocatOutput = z.string()

export const metaGetOctocat = pikkuSessionlessFunc({
  description: "Get the octocat as ASCII art",
  input: MetaGetOctocatInput,
  output: MetaGetOctocatOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/octocat", data) as any
  },
})
