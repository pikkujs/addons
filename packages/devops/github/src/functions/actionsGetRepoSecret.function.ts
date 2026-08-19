// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ActionsGetRepoSecretInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  secret_name: z.string().describe("The name of the secret."),
})

export const ActionsGetRepoSecretOutput = z.object({
  created_at: z.string().datetime(),
  name: z.string().describe("The name of the secret."),
  updated_at: z.string().datetime(),
}).describe("Set secrets for GitHub Actions.")

export const actionsGetRepoSecret = pikkuSessionlessFunc({
  description: "Gets a single repository secret without revealing its encrypted value. You must authenticate using an access token with the `repo` scope to use this endpoint. GitHub Apps must have the `secrets` repository permission to use this endpoint.",
  input: ActionsGetRepoSecretInput,
  output: ActionsGetRepoSecretOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/actions/secrets/{secret_name}", data) as any
  },
})
