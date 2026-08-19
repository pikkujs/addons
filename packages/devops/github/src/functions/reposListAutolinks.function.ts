// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ReposListAutolinksInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const ReposListAutolinksOutput = z.array(z.object({
  id: z.number().int(),
  is_alphanumeric: z.boolean().describe("Whether this autolink reference matches alphanumeric characters. If false, this autolink reference only matches numeric characters."),
  key_prefix: z.string().describe("The prefix of a key that is linkified."),
  url_template: z.string().describe("A template for the target URL that is generated if a key was found."),
}))

export const reposListAutolinks = pikkuSessionlessFunc({
  description: "This returns a list of autolinks configured for the given repository.\n\nInformation about autolinks are only available to repository administrators.",
  input: ReposListAutolinksInput,
  output: ReposListAutolinksOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/autolinks", data) as any
  },
})
