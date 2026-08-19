// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError } from '@pikku/core/errors'

export const ReposCreateDeploymentBranchPolicyInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  environment_name: z.string().describe("The name of the environment."),
  name: z.string().describe("The name pattern that branches must match in order to deploy to the environment.\n\nWildcard characters will not match `/`. For example, to match branches that begin with `release/` and contain an additional single slash, use `release/* /*`.\nFor more information about pattern matching syntax, see the [Ruby File.fnmatch documentation](https://ruby-doc.org/core-2.5.1/File.html#method-c-fnmatch)."),
})

export const ReposCreateDeploymentBranchPolicyOutput = z.object({
  id: z.number().int().optional().describe("The unique identifier of the branch policy."),
  name: z.string().optional().describe("The name pattern that branches must match in order to deploy to the environment."),
  node_id: z.string().optional(),
}).describe("Details of a deployment branch policy.")

export const reposCreateDeploymentBranchPolicy = pikkuSessionlessFunc({
  description: "Creates a deployment branch policy for an environment.\n\nYou must authenticate using an access token with the `repo` scope to use this endpoint. GitHub Apps must have the `administration:write` permission for the repository to use this endpoint.",
  input: ReposCreateDeploymentBranchPolicyInput,
  output: ReposCreateDeploymentBranchPolicyOutput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("POST", "/repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies", data) as any
  },
})
