// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ReposGetDeploymentBranchPolicyInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  environment_name: z.string().describe("The name of the environment."),
  branch_policy_id: z.number().int().describe("The unique identifier of the branch policy."),
})

export const ReposGetDeploymentBranchPolicyOutput = z.object({
  id: z.number().int().optional().describe("The unique identifier of the branch policy."),
  name: z.string().optional().describe("The name pattern that branches must match in order to deploy to the environment."),
  node_id: z.string().optional(),
}).describe("Details of a deployment branch policy.")

export const reposGetDeploymentBranchPolicy = pikkuSessionlessFunc({
  description: "Gets a deployment branch policy for an environment.\n\nAnyone with read access to the repository can use this endpoint. If the repository is private, you must use an access token with the `repo` scope. GitHub Apps must have the `actions:read` permission to use this endpoint.",
  input: ReposGetDeploymentBranchPolicyInput,
  output: ReposGetDeploymentBranchPolicyOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies/{branch_policy_id}", data) as any
  },
})
