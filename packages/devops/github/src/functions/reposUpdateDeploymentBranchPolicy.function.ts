// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ReposUpdateDeploymentBranchPolicyInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  environment_name: z.string().describe("The name of the environment."),
  branch_policy_id: z.number().int().describe("The unique identifier of the branch policy."),
  name: z.string().describe("The name pattern that branches must match in order to deploy to the environment.\n\nWildcard characters will not match `/`. For example, to match branches that begin with `release/` and contain an additional single slash, use `release/* /*`.\nFor more information about pattern matching syntax, see the [Ruby File.fnmatch documentation](https://ruby-doc.org/core-2.5.1/File.html#method-c-fnmatch)."),
})

export const ReposUpdateDeploymentBranchPolicyOutput = z.object({
  id: z.number().int().optional().describe("The unique identifier of the branch policy."),
  name: z.string().optional().describe("The name pattern that branches must match in order to deploy to the environment."),
  node_id: z.string().optional(),
}).describe("Details of a deployment branch policy.")

export const reposUpdateDeploymentBranchPolicy = pikkuSessionlessFunc({
  description: "Updates a deployment branch policy for an environment.\n\nYou must authenticate using an access token with the `repo` scope to use this endpoint. GitHub Apps must have the `administration:write` permission for the repository to use this endpoint.",
  input: ReposUpdateDeploymentBranchPolicyInput,
  output: ReposUpdateDeploymentBranchPolicyOutput,
  func: async ({ github }, data) => {
    return github.call("PUT", "/repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies/{branch_policy_id}", data) as any
  },
})
