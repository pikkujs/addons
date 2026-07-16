// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ReposListDeploymentBranchPoliciesInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  environment_name: z.string().describe("The name of the environment."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const ReposListDeploymentBranchPoliciesOutput = z.object({
  branch_policies: z.array(z.object({
    id: z.number().int().optional().describe("The unique identifier of the branch policy."),
    name: z.string().optional().describe("The name pattern that branches must match in order to deploy to the environment."),
    node_id: z.string().optional(),
  })),
  total_count: z.number().int().describe("The number of deployment branch policies for the environment."),
})

export const reposListDeploymentBranchPolicies = pikkuSessionlessFunc({
  description: "Lists the deployment branch policies for an environment.\n\nAnyone with read access to the repository can use this endpoint. If the repository is private, you must use an access token with the `repo` scope. GitHub Apps must have the `actions:read` permission to use this endpoint.",
  input: ReposListDeploymentBranchPoliciesInput,
  output: ReposListDeploymentBranchPoliciesOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies", data) as any
  },
})
