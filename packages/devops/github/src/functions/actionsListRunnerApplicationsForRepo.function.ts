// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ActionsListRunnerApplicationsForRepoInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
})

export const ActionsListRunnerApplicationsForRepoOutput = z.array(z.object({
  architecture: z.string(),
  download_url: z.string(),
  filename: z.string(),
  os: z.string(),
  sha256_checksum: z.string().optional(),
  temp_download_token: z.string().optional().describe("A short lived bearer token used to download the runner, if needed."),
}))

export const actionsListRunnerApplicationsForRepo = pikkuSessionlessFunc({
  description: "Lists binaries for the runner application that you can download and run.\n\nYou must authenticate using an access token with the `repo` scope to use this endpoint.",
  input: ActionsListRunnerApplicationsForRepoInput,
  output: ActionsListRunnerApplicationsForRepoOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/actions/runners/downloads", data) as any
  },
})
