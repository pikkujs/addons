// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError, UnprocessableContentError } from '@pikku/core/errors'

export const ActionsAddCustomLabelsToSelfHostedRunnerForRepoInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  runner_id: z.number().int().describe("Unique identifier of the self-hosted runner."),
  labels: z.array(z.string()).min(1).max(100).describe("The names of the custom labels to add to the runner."),
})

export const ActionsAddCustomLabelsToSelfHostedRunnerForRepoOutput = z.object({
  labels: z.array(z.object({
    id: z.number().int().optional().describe("Unique identifier of the label."),
    name: z.string().describe("Name of the label."),
    type: z.enum(["read-only", "custom"]).optional().describe("The type of label. Read-only labels are applied automatically when the runner is configured."),
  })),
  total_count: z.number().int(),
})

export const actionsAddCustomLabelsToSelfHostedRunnerForRepo = pikkuSessionlessFunc({
  description: "Add custom labels to a self-hosted runner configured in a repository.\n\nYou must authenticate using an access token with the `repo` scope to use this\nendpoint.",
  input: ActionsAddCustomLabelsToSelfHostedRunnerForRepoInput,
  output: ActionsAddCustomLabelsToSelfHostedRunnerForRepoOutput,
  errors: [NotFoundError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("POST", "/repos/{owner}/{repo}/actions/runners/{runner_id}/labels", data) as any
  },
})
