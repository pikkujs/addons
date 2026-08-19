// codespaces — Endpoints to manage Codespaces using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, NotFoundError, InternalServerError } from '@pikku/core/errors'

export const CodespacesSetRepositoriesForSecretForAuthenticatedUserInput = z.object({
  secret_name: z.string().describe("The name of the secret."),
  selected_repository_ids: z.array(z.number().int()).describe("An array of repository ids for which a codespace can access the secret. You can manage the list of selected repositories using the [List selected repositories for a user secret](https://docs.github.com/rest/reference/codespaces#list-selected-repositories-for-a-user-secret), [Add a selected repository to a user secret](https://docs.github.com/rest/reference/codespaces#add-a-selected-repository-to-a-user-secret), and [Remove a selected repository from a user secret](https://docs.github.com/rest/reference/codespaces#remove-a-selected-repository-from-a-user-secret) endpoints."),
})

export const codespacesSetRepositoriesForSecretForAuthenticatedUser = pikkuSessionlessFunc({
  description: "Select the repositories that will use a user's codespace secret.\n\nYou must authenticate using an access token with the `codespace` or `codespace:secrets` scope to use this endpoint. User must have Codespaces access to use this endpoint.\n\nGitHub Apps must have write access to the `codespaces_user_secrets` user permission and write access to the `codespaces_secrets` repository permission on all referenced repositories to use this endpoint.",
  input: CodespacesSetRepositoriesForSecretForAuthenticatedUserInput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError, InternalServerError],
  func: async ({ github }, data) => {
    return github.call("PUT", "/user/codespaces/secrets/{secret_name}/repositories", data)
  },
})
