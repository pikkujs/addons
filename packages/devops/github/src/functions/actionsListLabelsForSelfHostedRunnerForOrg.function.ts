// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { NotFoundError } from '@pikku/core/errors'

export const ActionsListLabelsForSelfHostedRunnerForOrgInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  runner_id: z.number().int().describe("Unique identifier of the self-hosted runner."),
})

export const ActionsListLabelsForSelfHostedRunnerForOrgOutput = z.object({
  labels: z.array(z.object({
    id: z.number().int().optional().describe("Unique identifier of the label."),
    name: z.string().describe("Name of the label."),
    type: z.enum(["read-only", "custom"]).optional().describe("The type of label. Read-only labels are applied automatically when the runner is configured."),
  })),
  total_count: z.number().int(),
})

export const actionsListLabelsForSelfHostedRunnerForOrg = pikkuSessionlessFunc({
  description: "Lists all labels for a self-hosted runner configured in an organization.\n\nYou must authenticate using an access token with the `admin:org` scope to use this endpoint.",
  input: ActionsListLabelsForSelfHostedRunnerForOrgInput,
  output: ActionsListLabelsForSelfHostedRunnerForOrgOutput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/orgs/{org}/actions/runners/{runner_id}/labels", data) as any
  },
})
