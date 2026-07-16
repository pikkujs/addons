// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ActionsGetSelfHostedRunnerForRepoInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  runner_id: z.number().int().describe("Unique identifier of the self-hosted runner."),
})

export const ActionsGetSelfHostedRunnerForRepoOutput = z.object({
  busy: z.boolean(),
  id: z.number().int().describe("The id of the runner."),
  labels: z.array(z.object({
    id: z.number().int().optional().describe("Unique identifier of the label."),
    name: z.string().describe("Name of the label."),
    type: z.enum(["read-only", "custom"]).optional().describe("The type of label. Read-only labels are applied automatically when the runner is configured."),
  })),
  name: z.string().describe("The name of the runner."),
  os: z.string().describe("The Operating System of the runner."),
  status: z.string().describe("The status of the runner."),
}).describe("A self hosted runner")

export const actionsGetSelfHostedRunnerForRepo = pikkuSessionlessFunc({
  description: "Gets a specific self-hosted runner configured in a repository.\n\nYou must authenticate using an access token with the `repo` scope to use this\nendpoint.",
  input: ActionsGetSelfHostedRunnerForRepoInput,
  output: ActionsGetSelfHostedRunnerForRepoOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/actions/runners/{runner_id}", data) as any
  },
})
