// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ActionsGetEnvironmentSecretInput = z.object({
  repository_id: z.number().int().describe("The unique identifier of the repository."),
  environment_name: z.string().describe("The name of the environment."),
  secret_name: z.string().describe("The name of the secret."),
})

export const ActionsGetEnvironmentSecretOutput = z.object({
  created_at: z.string().datetime(),
  name: z.string().describe("The name of the secret."),
  updated_at: z.string().datetime(),
}).describe("Set secrets for GitHub Actions.")

export const actionsGetEnvironmentSecret = pikkuSessionlessFunc({
  description: "Gets a single environment secret without revealing its encrypted value. You must authenticate using an access token with the `repo` scope to use this endpoint. GitHub Apps must have the `secrets` repository permission to use this endpoint.",
  input: ActionsGetEnvironmentSecretInput,
  output: ActionsGetEnvironmentSecretOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}", data) as any
  },
})
