// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError } from '@pikku/core/errors'

export const ReposGetAutolinkInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  autolink_id: z.number().int().describe("The unique identifier of the autolink."),
})

export const ReposGetAutolinkOutput = z.object({
  id: z.number().int(),
  is_alphanumeric: z.boolean().describe("Whether this autolink reference matches alphanumeric characters. If false, this autolink reference only matches numeric characters."),
  key_prefix: z.string().describe("The prefix of a key that is linkified."),
  url_template: z.string().describe("A template for the target URL that is generated if a key was found."),
}).describe("An autolink reference.")

export const reposGetAutolink = pikkuSessionlessFunc({
  description: "This returns a single autolink reference by ID that was configured for the given repository.\n\nInformation about autolinks are only available to repository administrators.",
  input: ReposGetAutolinkInput,
  output: ReposGetAutolinkOutput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/autolinks/{autolink_id}", data) as any
  },
})
