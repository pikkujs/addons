// codespaces — Endpoints to manage Codespaces using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CodespacesGetPublicKeyForAuthenticatedUserOutput = z.object({
  key: z.string().describe("The Base64 encoded public key."),
  key_id: z.string().describe("The identifier for the key."),
}).describe("The public key used for setting user Codespaces' Secrets.")

export const codespacesGetPublicKeyForAuthenticatedUser = pikkuSessionlessFunc({
  description: "Gets your public key, which you need to encrypt secrets. You need to encrypt a secret before you can create or update secrets.\n\nYou must authenticate using an access token with the `codespace` or `codespace:secrets` scope to use this endpoint. User must have Codespaces access to use this endpoint.\n\nGitHub Apps must have read access to the `codespaces_user_secrets` user permission to use this endpoint.",
  output: CodespacesGetPublicKeyForAuthenticatedUserOutput,
  func: async ({ github }) => {
    return github.call("GET", "/user/codespaces/secrets/public-key") as any
  },
})
