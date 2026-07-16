// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ActionsListRunnerApplicationsForOrgInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
})

export const ActionsListRunnerApplicationsForOrgOutput = z.array(z.object({
  architecture: z.string(),
  download_url: z.string(),
  filename: z.string(),
  os: z.string(),
  sha256_checksum: z.string().optional(),
  temp_download_token: z.string().optional().describe("A short lived bearer token used to download the runner, if needed."),
}))

export const actionsListRunnerApplicationsForOrg = pikkuSessionlessFunc({
  description: "Lists binaries for the runner application that you can download and run.\n\nYou must authenticate using an access token with the `admin:org` scope to use this endpoint.",
  input: ActionsListRunnerApplicationsForOrgInput,
  output: ActionsListRunnerApplicationsForOrgOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/orgs/{org}/actions/runners/downloads", data) as any
  },
})
