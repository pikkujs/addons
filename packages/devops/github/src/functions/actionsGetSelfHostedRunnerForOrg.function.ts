// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ActionsGetSelfHostedRunnerForOrgInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  runner_id: z.number().int().describe("Unique identifier of the self-hosted runner."),
})

export const ActionsGetSelfHostedRunnerForOrgOutput = z.object({
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

export const actionsGetSelfHostedRunnerForOrg = pikkuSessionlessFunc({
  description: "Gets a specific self-hosted runner configured in an organization.\n\nYou must authenticate using an access token with the `admin:org` scope to use this endpoint.",
  input: ActionsGetSelfHostedRunnerForOrgInput,
  output: ActionsGetSelfHostedRunnerForOrgOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/orgs/{org}/actions/runners/{runner_id}", data) as any
  },
})
