// dependabot — Endpoints to manage Dependabot.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DependabotGetRepoSecretInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  secret_name: z.string().describe("The name of the secret."),
})

export const DependabotGetRepoSecretOutput = z.object({
  created_at: z.string().datetime(),
  name: z.string().describe("The name of the secret."),
  updated_at: z.string().datetime(),
}).describe("Set secrets for Dependabot.")

export const dependabotGetRepoSecret = pikkuSessionlessFunc({
  description: "Gets a single repository secret without revealing its encrypted value. You must authenticate using an access token with the `repo` scope to use this endpoint. GitHub Apps must have the `dependabot_secrets` repository permission to use this endpoint.",
  input: DependabotGetRepoSecretInput,
  output: DependabotGetRepoSecretOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/dependabot/secrets/{secret_name}", data) as any
  },
})
