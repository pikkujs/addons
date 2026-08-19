// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const ReposDeleteInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
})

export const reposDelete = pikkuSessionlessFunc({
  description: "Deleting a repository requires admin access. If OAuth is used, the `delete_repo` scope is required.\n\nIf an organization owner has configured the organization to prevent members from deleting organization-owned\nrepositories, you will get a `403 Forbidden` response.",
  input: ReposDeleteInput,
  errors: [ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("DELETE", "/repos/{owner}/{repo}", data)
  },
})
