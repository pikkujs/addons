// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnprocessableContentError } from '@pikku/core/errors'

export const ReposCreateAutolinkInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  is_alphanumeric: z.boolean().optional().default(true).describe("Whether this autolink reference matches alphanumeric characters. If true, the `<num>` parameter of the `url_template` matches alphanumeric characters `A-Z` (case insensitive), `0-9`, and `-`. If false, this autolink reference only matches numeric characters."),
  key_prefix: z.string().describe("This prefix appended by certain characters will generate a link any time it is found in an issue, pull request, or commit."),
  url_template: z.string().describe("The URL must contain `<num>` for the reference number. `<num>` matches different characters depending on the value of `is_alphanumeric`."),
})

export const ReposCreateAutolinkOutput = z.object({
  id: z.number().int(),
  is_alphanumeric: z.boolean().describe("Whether this autolink reference matches alphanumeric characters. If false, this autolink reference only matches numeric characters."),
  key_prefix: z.string().describe("The prefix of a key that is linkified."),
  url_template: z.string().describe("A template for the target URL that is generated if a key was found."),
}).describe("An autolink reference.")

export const reposCreateAutolink = pikkuSessionlessFunc({
  description: "Users with admin access to the repository can create an autolink.",
  input: ReposCreateAutolinkInput,
  output: ReposCreateAutolinkOutput,
  errors: [UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("POST", "/repos/{owner}/{repo}/autolinks", data) as any
  },
})
