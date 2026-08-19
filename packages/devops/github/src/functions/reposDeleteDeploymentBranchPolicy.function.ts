// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ReposDeleteDeploymentBranchPolicyInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  environment_name: z.string().describe("The name of the environment."),
  branch_policy_id: z.number().int().describe("The unique identifier of the branch policy."),
})

export const reposDeleteDeploymentBranchPolicy = pikkuSessionlessFunc({
  description: "Deletes a deployment branch policy for an environment.\n\nYou must authenticate using an access token with the `repo` scope to use this endpoint. GitHub Apps must have the `administration:write` permission for the repository to use this endpoint.",
  input: ReposDeleteDeploymentBranchPolicyInput,
  func: async ({ github }, data) => {
    return github.call("DELETE", "/repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies/{branch_policy_id}", data)
  },
})
