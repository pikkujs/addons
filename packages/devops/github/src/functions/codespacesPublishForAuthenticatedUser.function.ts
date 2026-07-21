// codespaces — Endpoints to manage Codespaces using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, NotFoundError, UnprocessableContentError } from '@pikku/core/errors'

export const CodespacesPublishForAuthenticatedUserInput = z.object({
  codespace_name: z.string().describe("The name of the codespace."),
  name: z.string().optional().describe("A name for the new repository."),
  private: z.boolean().optional().default(false).describe("Whether the new repository should be private."),
})

export const CodespacesPublishForAuthenticatedUserOutput = z.any()

export const codespacesPublishForAuthenticatedUser = pikkuSessionlessFunc({
  description: "Publishes an unpublished codespace, creating a new repository and assigning it to the codespace.\n\nThe codespace's token is granted write permissions to the repository, allowing the user to push their changes.\n\nThis will fail for a codespace that is already published, meaning it has an associated repository.\n\nYou must authenticate using a personal access token with the `codespace` scope to use this endpoint.\n\nGitHub Apps must have write access to the `codespaces` repository permission to use this endpoint.",
  input: CodespacesPublishForAuthenticatedUserInput,
  output: CodespacesPublishForAuthenticatedUserOutput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("POST", "/user/codespaces/{codespace_name}/publish", data) as any
  },
})
