// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ActionsGetEnvironmentPublicKeyInput = z.object({
  repository_id: z.number().int().describe("The unique identifier of the repository."),
  environment_name: z.string().describe("The name of the environment."),
})

export const ActionsGetEnvironmentPublicKeyOutput = z.object({
  created_at: z.string().optional(),
  id: z.number().int().optional(),
  key: z.string().describe("The Base64 encoded public key."),
  key_id: z.string().describe("The identifier for the key."),
  title: z.string().optional(),
  url: z.string().optional(),
}).describe("The public key used for setting Actions Secrets.")

export const actionsGetEnvironmentPublicKey = pikkuSessionlessFunc({
  description: "Get the public key for an environment, which you need to encrypt environment secrets. You need to encrypt a secret before you can create or update secrets. Anyone with read access to the repository can use this endpoint. If the repository is private you must use an access token with the `repo` scope. GitHub Apps must have the `secrets` repository permission to use this endpoint.",
  input: ActionsGetEnvironmentPublicKeyInput,
  output: ActionsGetEnvironmentPublicKeyOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repositories/{repository_id}/environments/{environment_name}/secrets/public-key", data) as any
  },
})
