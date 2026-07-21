// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, ForbiddenError, NotFoundError, UnprocessableContentError } from '@pikku/core/errors'

export const ReposCreateForkInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  default_branch_only: z.boolean().optional().describe("When forking from an existing repository, fork with only the default branch."),
  name: z.string().optional().describe("When forking from an existing repository, a new name for the fork."),
  organization: z.string().optional().describe("Optional parameter to specify the organization name if forking into an organization."),
})

export const ReposCreateForkOutput = z.any()

export const reposCreateFork = pikkuSessionlessFunc({
  description: "Create a fork for the authenticated user.\n\n**Note**: Forking a Repository happens asynchronously. You may have to wait a short period of time before you can access the git objects. If this takes longer than 5 minutes, be sure to contact [GitHub Support](https://support.github.com/contact?tags=dotcom-rest-api).",
  input: ReposCreateForkInput,
  output: ReposCreateForkOutput,
  errors: [BadRequestError, ForbiddenError, NotFoundError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("POST", "/repos/{owner}/{repo}/forks", data) as any
  },
})
