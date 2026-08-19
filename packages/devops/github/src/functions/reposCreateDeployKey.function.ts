// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnprocessableContentError } from '@pikku/core/errors'

export const ReposCreateDeployKeyInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  key: z.string().describe("The contents of the key."),
  read_only: z.boolean().optional().describe("If `true`, the key will only be able to read repository contents. Otherwise, the key will be able to read and write.  \n  \nDeploy keys with write access can perform the same actions as an organization member with admin access, or a collaborator on a personal repository. For more information, see \"[Repository permission levels for an organization](https://docs.github.com/articles/repository-permission-levels-for-an-organization/)\" and \"[Permission levels for a user account repository](https://docs.github.com/articles/permission-levels-for-a-user-account-repository/).\""),
  title: z.string().optional().describe("A name for the key."),
})

export const ReposCreateDeployKeyOutput = z.object({
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

export const reposCreateDeployKey = pikkuSessionlessFunc({
  description: "You can create a read-only deploy key.",
  input: ReposCreateDeployKeyInput,
  output: ReposCreateDeployKeyOutput,
  errors: [UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("POST", "/repos/{owner}/{repo}/keys", data) as any
  },
})
