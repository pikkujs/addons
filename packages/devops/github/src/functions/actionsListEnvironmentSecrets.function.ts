// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ActionsListEnvironmentSecretsInput = z.object({
  repository_id: z.number().int().describe("The unique identifier of the repository."),
  environment_name: z.string().describe("The name of the environment."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const ActionsListEnvironmentSecretsOutput = z.object({
  secrets: z.array(z.object({
    created_at: z.string().datetime(),
    name: z.string().describe("The name of the secret."),
    updated_at: z.string().datetime(),
  })),
  total_count: z.number().int(),
})

export const actionsListEnvironmentSecrets = pikkuSessionlessFunc({
  description: "Lists all secrets available in an environment without revealing their encrypted values. You must authenticate using an access token with the `repo` scope to use this endpoint. GitHub Apps must have the `secrets` repository permission to use this endpoint.",
  input: ActionsListEnvironmentSecretsInput,
  output: ActionsListEnvironmentSecretsOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repositories/{repository_id}/environments/{environment_name}/secrets", data) as any
  },
})
