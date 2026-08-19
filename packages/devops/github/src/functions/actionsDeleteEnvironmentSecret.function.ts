// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ActionsDeleteEnvironmentSecretInput = z.object({
  repository_id: z.number().int().describe("The unique identifier of the repository."),
  environment_name: z.string().describe("The name of the environment."),
  secret_name: z.string().describe("The name of the secret."),
})

export const actionsDeleteEnvironmentSecret = pikkuSessionlessFunc({
  description: "Deletes a secret in an environment using the secret name. You must authenticate using an access token with the `repo` scope to use this endpoint. GitHub Apps must have the `secrets` repository permission to use this endpoint.",
  input: ActionsDeleteEnvironmentSecretInput,
  func: async ({ github }, data) => {
    return github.call("DELETE", "/repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}", data)
  },
})
