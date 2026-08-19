// codespaces — Endpoints to manage Codespaces using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CodespacesGetRepoPublicKeyInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
})

export const CodespacesGetRepoPublicKeyOutput = z.object({
  created_at: z.string().optional(),
  id: z.number().int().optional(),
  key: z.string().describe("The Base64 encoded public key."),
  key_id: z.string().describe("The identifier for the key."),
  title: z.string().optional(),
  url: z.string().optional(),
}).describe("The public key used for setting Codespaces secrets.")

export const codespacesGetRepoPublicKey = pikkuSessionlessFunc({
  description: "Gets your public key, which you need to encrypt secrets. You need to encrypt a secret before you can create or update secrets. Anyone with read access to the repository can use this endpoint. If the repository is private you must use an access token with the `repo` scope. GitHub Apps must have write access to the `codespaces_secrets` repository permission to use this endpoint.",
  input: CodespacesGetRepoPublicKeyInput,
  output: CodespacesGetRepoPublicKeyOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/codespaces/secrets/public-key", data) as any
  },
})
