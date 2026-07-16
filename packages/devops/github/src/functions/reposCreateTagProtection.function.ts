// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const ReposCreateTagProtectionInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  pattern: z.string().describe("An optional glob pattern to match against when enforcing tag protection."),
})

export const ReposCreateTagProtectionOutput = z.object({
  created_at: z.string().optional(),
  enabled: z.boolean().optional(),
  id: z.number().int().optional(),
  pattern: z.string(),
  updated_at: z.string().optional(),
}).describe("Tag protection")

export const reposCreateTagProtection = pikkuSessionlessFunc({
  description: "This creates a tag protection state for a repository.\nThis endpoint is only available to repository administrators.",
  input: ReposCreateTagProtectionInput,
  output: ReposCreateTagProtectionOutput,
  errors: [ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("POST", "/repos/{owner}/{repo}/tags/protection", data) as any
  },
})
