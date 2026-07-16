// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ActionsDeleteSelfHostedRunnerFromRepoInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  runner_id: z.number().int().describe("Unique identifier of the self-hosted runner."),
})

export const actionsDeleteSelfHostedRunnerFromRepo = pikkuSessionlessFunc({
  description: "Forces the removal of a self-hosted runner from a repository. You can use this endpoint to completely remove the runner when the machine you were using no longer exists.\n\nYou must authenticate using an access token with the `repo`\nscope to use this endpoint.",
  input: ActionsDeleteSelfHostedRunnerFromRepoInput,
  func: async ({ github }, data) => {
    return github.call("DELETE", "/repos/{owner}/{repo}/actions/runners/{runner_id}", data)
  },
})
