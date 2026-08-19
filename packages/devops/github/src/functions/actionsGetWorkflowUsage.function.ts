// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ActionsGetWorkflowUsageInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  workflow_id: z.union([z.number().int(), z.string()]).describe("The ID of the workflow. You can also pass the workflow file name as a string."),
})

export const ActionsGetWorkflowUsageOutput = z.object({
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

export const actionsGetWorkflowUsage = pikkuSessionlessFunc({
  description: "Gets the number of billable minutes used by a specific workflow during the current billing cycle. Billable minutes only apply to workflows in private repositories that use GitHub-hosted runners. Usage is listed for each GitHub-hosted runner operating system in milliseconds. Any job re-runs are also included in the usage. The usage does not include the multiplier for macOS and Windows runners and is not rounded up to the nearest whole minute. For more information, see \"[Managing billing for GitHub Actions](https://docs.github.com/github/setting-up-and-managing-billing-and-payments-on-github/managing-billing-for-github-actions)\".\n\nYou can replace `workflow_id` with the workflow file name. For example, you could use `main.yaml`. Anyone with read access to the repository can use this endpoint. If the repository is private you must use an access token with the `repo` scope. GitHub Apps must have the `actions:read` permission to use this endpoint.",
  input: ActionsGetWorkflowUsageInput,
  output: ActionsGetWorkflowUsageOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/actions/workflows/{workflow_id}/timing", data) as any
  },
})
