// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const ReposListTagProtectionInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
})

export const ReposListTagProtectionOutput = z.array(z.object({
  created_at: z.string().optional(),
  enabled: z.boolean().optional(),
  id: z.number().int().optional(),
  pattern: z.string(),
  updated_at: z.string().optional(),
}))

export const reposListTagProtection = pikkuSessionlessFunc({
  description: "This returns the tag protection states of a repository.\n\nThis information is only available to repository administrators.",
  input: ReposListTagProtectionInput,
  output: ReposListTagProtectionOutput,
  errors: [ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/tags/protection", data) as any
  },
})
