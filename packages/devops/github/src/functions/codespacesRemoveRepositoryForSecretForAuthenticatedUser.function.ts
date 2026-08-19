// codespaces — Endpoints to manage Codespaces using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, NotFoundError, InternalServerError } from '@pikku/core/errors'

export const CodespacesRemoveRepositoryForSecretForAuthenticatedUserInput = z.object({
  secret_name: z.string().describe("The name of the secret."),
  repository_id: z.number().int(),
})

export const codespacesRemoveRepositoryForSecretForAuthenticatedUser = pikkuSessionlessFunc({
  description: "Removes a repository from the selected repositories for a user's codespace secret.\nYou must authenticate using an access token with the `codespace` or `codespace:secrets` scope to use this endpoint. User must have Codespaces access to use this endpoint.\nGitHub Apps must have write access to the `codespaces_user_secrets` user permission to use this endpoint.",
  input: CodespacesRemoveRepositoryForSecretForAuthenticatedUserInput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError, InternalServerError],
  func: async ({ github }, data) => {
    return github.call("DELETE", "/user/codespaces/secrets/{secret_name}/repositories/{repository_id}", data)
  },
})
