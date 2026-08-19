// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError } from '@pikku/core/errors'

export const ActionsGetRepoRequiredWorkflowUsageInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  required_workflow_id_for_repo: z.number().int().describe("The ID of the required workflow that has run at least once in a repository."),
})

export const ActionsGetRepoRequiredWorkflowUsageOutput = z.object({
  billable: z.object({
    MACOS: z.object({
      total_ms: z.number().int().optional(),
    }).optional(),
    UBUNTU: z.object({
      total_ms: z.number().int().optional(),
    }).optional(),
    WINDOWS: z.object({
      total_ms: z.number().int().optional(),
    }).optional(),
  }),
}).describe("Workflow Usage")

export const actionsGetRepoRequiredWorkflowUsage = pikkuSessionlessFunc({
  description: "Gets the number of billable minutes used by a specific required workflow during the current billing cycle.\n\nBillable minutes only apply to required workflows running in private repositories that use GitHub-hosted runners. Usage is listed for each GitHub-hosted runner operating system in milliseconds. Any job re-runs are also included in the usage. The usage does not include the multiplier for macOS and Windows runners and is not rounded up to the nearest whole minute. For more information, see \"[Managing billing for GitHub Actions](https://docs.github.com/github/setting-up-and-managing-billing-and-payments-on-github/managing-billing-for-github-actions).\"\n\nAnyone with read access to the repository can use this endpoint. If the repository is private you must use an access token with the `repo` scope. GitHub Apps must have the `actions:read` permission to use this endpoint.",
  input: ActionsGetRepoRequiredWorkflowUsageInput,
  output: ActionsGetRepoRequiredWorkflowUsageOutput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{org}/{repo}/actions/required_workflows/{required_workflow_id_for_repo}/timing", data) as any
  },
})
