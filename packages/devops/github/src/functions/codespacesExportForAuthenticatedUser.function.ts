// codespaces — Endpoints to manage Codespaces using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, NotFoundError, UnprocessableContentError, InternalServerError } from '@pikku/core/errors'

export const CodespacesExportForAuthenticatedUserInput = z.object({
  codespace_name: z.string().describe("The name of the codespace."),
})

export const CodespacesExportForAuthenticatedUserOutput = z.object({
  branch: z.string().nullable().optional().describe("Name of the exported branch"),
  completed_at: z.string().datetime().nullable().optional().describe("Completion time of the last export operation"),
  export_url: z.string().optional().describe("Url for fetching export details"),
  html_url: z.string().nullable().optional().describe("Web url for the exported branch"),
  id: z.string().optional().describe("Id for the export details"),
  sha: z.string().nullable().optional().describe("Git commit SHA of the exported branch"),
  state: z.string().nullable().optional().describe("State of the latest export"),
}).describe("An export of a codespace. Also, latest export details for a codespace can be fetched with id = latest")

export const codespacesExportForAuthenticatedUser = pikkuSessionlessFunc({
  description: "Triggers an export of the specified codespace and returns a URL and ID where the status of the export can be monitored.\n\nIf changes cannot be pushed to the codespace's repository, they will be pushed to a new or previously-existing fork instead.\n\nYou must authenticate using a personal access token with the `codespace` scope to use this endpoint.\n\nGitHub Apps must have write access to the `codespaces_lifecycle_admin` repository permission to use this endpoint.",
  input: CodespacesExportForAuthenticatedUserInput,
  output: CodespacesExportForAuthenticatedUserOutput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError, UnprocessableContentError, InternalServerError],
  func: async ({ github }, data) => {
    return github.call("POST", "/user/codespaces/{codespace_name}/exports", data) as any
  },
})
