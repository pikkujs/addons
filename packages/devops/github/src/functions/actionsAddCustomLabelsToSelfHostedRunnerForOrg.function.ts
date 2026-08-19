// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError, UnprocessableContentError } from '@pikku/core/errors'

export const ActionsAddCustomLabelsToSelfHostedRunnerForOrgInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  runner_id: z.number().int().describe("Unique identifier of the self-hosted runner."),
  labels: z.array(z.string()).min(1).max(100).describe("The names of the custom labels to add to the runner."),
})

export const ActionsAddCustomLabelsToSelfHostedRunnerForOrgOutput = z.object({
  labels: z.array(z.object({
    id: z.number().int().optional().describe("Unique identifier of the label."),
    name: z.string().describe("Name of the label."),
    type: z.enum(["read-only", "custom"]).optional().describe("The type of label. Read-only labels are applied automatically when the runner is configured."),
  })),
  total_count: z.number().int(),
})

export const actionsAddCustomLabelsToSelfHostedRunnerForOrg = pikkuSessionlessFunc({
  description: "Add custom labels to a self-hosted runner configured in an organization.\n\nYou must authenticate using an access token with the `admin:org` scope to use this endpoint.",
  input: ActionsAddCustomLabelsToSelfHostedRunnerForOrgInput,
  output: ActionsAddCustomLabelsToSelfHostedRunnerForOrgOutput,
  errors: [NotFoundError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("POST", "/orgs/{org}/actions/runners/{runner_id}/labels", data) as any
  },
})
