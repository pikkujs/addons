// codespaces — Endpoints to manage Codespaces using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CodespacesGetOrgPublicKeyInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
})

export const CodespacesGetOrgPublicKeyOutput = z.object({
  created_at: z.string().optional(),
  id: z.number().int().optional(),
  key: z.string().describe("The Base64 encoded public key."),
  key_id: z.string().describe("The identifier for the key."),
  title: z.string().optional(),
  url: z.string().optional(),
}).describe("The public key used for setting Codespaces secrets.")

export const codespacesGetOrgPublicKey = pikkuSessionlessFunc({
  description: "Gets a public key for an organization, which is required in order to encrypt secrets. You need to encrypt the value of a secret before you can create or update secrets. You must authenticate using an access token with the `admin:org` scope to use this endpoint.",
  input: CodespacesGetOrgPublicKeyInput,
  output: CodespacesGetOrgPublicKeyOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/orgs/{org}/codespaces/secrets/public-key", data) as any
  },
})
