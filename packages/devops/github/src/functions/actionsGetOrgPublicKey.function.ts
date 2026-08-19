// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ActionsGetOrgPublicKeyInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
})

export const ActionsGetOrgPublicKeyOutput = z.object({
  created_at: z.string().optional(),
  id: z.number().int().optional(),
  key: z.string().describe("The Base64 encoded public key."),
  key_id: z.string().describe("The identifier for the key."),
  title: z.string().optional(),
  url: z.string().optional(),
}).describe("The public key used for setting Actions Secrets.")

export const actionsGetOrgPublicKey = pikkuSessionlessFunc({
  description: "Gets your public key, which you need to encrypt secrets. You need to encrypt a secret before you can create or update secrets. You must authenticate using an access token with the `admin:org` scope to use this endpoint. GitHub Apps must have the `secrets` organization permission to use this endpoint.",
  input: ActionsGetOrgPublicKeyInput,
  output: ActionsGetOrgPublicKeyOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/orgs/{org}/actions/secrets/public-key", data) as any
  },
})
