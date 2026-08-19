// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ActionsDeleteSelfHostedRunnerFromOrgInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  runner_id: z.number().int().describe("Unique identifier of the self-hosted runner."),
})

export const actionsDeleteSelfHostedRunnerFromOrg = pikkuSessionlessFunc({
  description: "Forces the removal of a self-hosted runner from an organization. You can use this endpoint to completely remove the runner when the machine you were using no longer exists.\n\nYou must authenticate using an access token with the `admin:org` scope to use this endpoint.",
  input: ActionsDeleteSelfHostedRunnerFromOrgInput,
  func: async ({ github }, data) => {
    return github.call("DELETE", "/orgs/{org}/actions/runners/{runner_id}", data)
  },
})
