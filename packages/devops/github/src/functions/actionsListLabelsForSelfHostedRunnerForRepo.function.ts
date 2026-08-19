// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError } from '@pikku/core/errors'

export const ActionsListLabelsForSelfHostedRunnerForRepoInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  runner_id: z.number().int().describe("Unique identifier of the self-hosted runner."),
})

export const ActionsListLabelsForSelfHostedRunnerForRepoOutput = z.object({
  labels: z.array(z.object({
    id: z.number().int().optional().describe("Unique identifier of the label."),
    name: z.string().describe("Name of the label."),
    type: z.enum(["read-only", "custom"]).optional().describe("The type of label. Read-only labels are applied automatically when the runner is configured."),
  })),
  total_count: z.number().int(),
})

export const actionsListLabelsForSelfHostedRunnerForRepo = pikkuSessionlessFunc({
  description: "Lists all labels for a self-hosted runner configured in a repository.\n\nYou must authenticate using an access token with the `repo` scope to use this\nendpoint.",
  input: ActionsListLabelsForSelfHostedRunnerForRepoInput,
  output: ActionsListLabelsForSelfHostedRunnerForRepoOutput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/actions/runners/{runner_id}/labels", data) as any
  },
})
