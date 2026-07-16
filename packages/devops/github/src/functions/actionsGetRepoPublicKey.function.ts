// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ActionsGetRepoPublicKeyInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
})

export const ActionsGetRepoPublicKeyOutput = z.object({
  created_at: z.string().optional(),
  id: z.number().int().optional(),
  key: z.string().describe("The Base64 encoded public key."),
  key_id: z.string().describe("The identifier for the key."),
  title: z.string().optional(),
  url: z.string().optional(),
}).describe("The public key used for setting Actions Secrets.")

export const actionsGetRepoPublicKey = pikkuSessionlessFunc({
  description: "Gets your public key, which you need to encrypt secrets. You need to encrypt a secret before you can create or update secrets. Anyone with read access to the repository can use this endpoint. If the repository is private you must use an access token with the `repo` scope. GitHub Apps must have the `secrets` repository permission to use this endpoint.",
  input: ActionsGetRepoPublicKeyInput,
  output: ActionsGetRepoPublicKeyOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/actions/secrets/public-key", data) as any
  },
})
