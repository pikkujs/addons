// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError, UnprocessableContentError } from '@pikku/core/errors'

export const ActionsRemoveCustomLabelFromSelfHostedRunnerForRepoInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  runner_id: z.number().int().describe("Unique identifier of the self-hosted runner."),
  name: z.string().describe("The name of a self-hosted runner's custom label."),
})

export const ActionsRemoveCustomLabelFromSelfHostedRunnerForRepoOutput = z.object({
  labels: z.array(z.object({
    id: z.number().int().optional().describe("Unique identifier of the label."),
    name: z.string().describe("Name of the label."),
    type: z.enum(["read-only", "custom"]).optional().describe("The type of label. Read-only labels are applied automatically when the runner is configured."),
  })),
  total_count: z.number().int(),
})

export const actionsRemoveCustomLabelFromSelfHostedRunnerForRepo = pikkuSessionlessFunc({
  description: "Remove a custom label from a self-hosted runner configured\nin a repository. Returns the remaining labels from the runner.\n\nThis endpoint returns a `404 Not Found` status if the custom label is not\npresent on the runner.\n\nYou must authenticate using an access token with the `repo` scope to use this\nendpoint.",
  input: ActionsRemoveCustomLabelFromSelfHostedRunnerForRepoInput,
  output: ActionsRemoveCustomLabelFromSelfHostedRunnerForRepoOutput,
  errors: [NotFoundError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("DELETE", "/repos/{owner}/{repo}/actions/runners/{runner_id}/labels/{name}", data) as any
  },
})
