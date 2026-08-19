// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError } from '@pikku/core/errors'

export const ActionsRemoveAllCustomLabelsFromSelfHostedRunnerForRepoInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  runner_id: z.number().int().describe("Unique identifier of the self-hosted runner."),
})

export const ActionsRemoveAllCustomLabelsFromSelfHostedRunnerForRepoOutput = z.object({
  labels: z.array(z.object({
    id: z.number().int().optional().describe("Unique identifier of the label."),
    name: z.string().describe("Name of the label."),
    type: z.enum(["read-only", "custom"]).optional().describe("The type of label. Read-only labels are applied automatically when the runner is configured."),
  })),
  total_count: z.number().int(),
})

export const actionsRemoveAllCustomLabelsFromSelfHostedRunnerForRepo = pikkuSessionlessFunc({
  description: "Remove all custom labels from a self-hosted runner configured in a\nrepository. Returns the remaining read-only labels from the runner.\n\nYou must authenticate using an access token with the `repo` scope to use this\nendpoint.",
  input: ActionsRemoveAllCustomLabelsFromSelfHostedRunnerForRepoInput,
  output: ActionsRemoveAllCustomLabelsFromSelfHostedRunnerForRepoOutput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("DELETE", "/repos/{owner}/{repo}/actions/runners/{runner_id}/labels", data) as any
  },
})
