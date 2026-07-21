// codespaces — Endpoints to manage Codespaces using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, NotFoundError, InternalServerError } from '@pikku/core/errors'

export const CodespacesDeleteForAuthenticatedUserInput = z.object({
  codespace_name: z.string().describe("The name of the codespace."),
})

export const CodespacesDeleteForAuthenticatedUserOutput = z.record(z.string(), z.unknown())

export const codespacesDeleteForAuthenticatedUser = pikkuSessionlessFunc({
  description: "Deletes a user's codespace.\n\nYou must authenticate using an access token with the `codespace` scope to use this endpoint.\n\nGitHub Apps must have write access to the `codespaces` repository permission to use this endpoint.",
  input: CodespacesDeleteForAuthenticatedUserInput,
  output: CodespacesDeleteForAuthenticatedUserOutput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError, InternalServerError],
  func: async ({ github }, data) => {
    return github.call("DELETE", "/user/codespaces/{codespace_name}", data) as any
  },
})
