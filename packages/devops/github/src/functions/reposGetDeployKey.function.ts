// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { NotFoundError } from '@pikku/core/errors'

export const ReposGetDeployKeyInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  key_id: z.number().int().describe("The unique identifier of the key."),
})

export const ReposGetDeployKeyOutput = z.object({
  added_by: z.string().nullable().optional(),
  created_at: z.string(),
  id: z.number().int(),
  key: z.string(),
  last_used: z.string().nullable().optional(),
  read_only: z.boolean(),
  title: z.string(),
  url: z.string(),
  verified: z.boolean(),
}).describe("An SSH key granting access to a single repository.")

export const reposGetDeployKey = pikkuSessionlessFunc({
  input: ReposGetDeployKeyInput,
  output: ReposGetDeployKeyOutput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/keys/{key_id}", data) as any
  },
})
