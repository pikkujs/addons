// codespaces — Endpoints to manage Codespaces using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CodespacesDeleteSecretForAuthenticatedUserInput = z.object({
  secret_name: z.string().describe("The name of the secret."),
})

export const codespacesDeleteSecretForAuthenticatedUser = pikkuSessionlessFunc({
  description: "Deletes a secret from a user's codespaces using the secret name. Deleting the secret will remove access from all codespaces that were allowed to access the secret.\n\nYou must authenticate using an access token with the `codespace` or `codespace:secrets` scope to use this endpoint. User must have Codespaces access to use this endpoint.\n\nGitHub Apps must have write access to the `codespaces_user_secrets` user permission to use this endpoint.",
  input: CodespacesDeleteSecretForAuthenticatedUserInput,
  func: async ({ github }, data) => {
    return github.call("DELETE", "/user/codespaces/secrets/{secret_name}", data)
  },
})
