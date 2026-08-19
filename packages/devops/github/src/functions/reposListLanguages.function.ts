// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ReposListLanguagesInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
})

export const ReposListLanguagesOutput = z.record(z.string(), z.number().int()).describe("Language")

export const reposListLanguages = pikkuSessionlessFunc({
  description: "Lists languages for the specified repository. The value shown for each language is the number of bytes of code written in that language.",
  input: ReposListLanguagesInput,
  output: ReposListLanguagesOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/languages", data) as any
  },
})
