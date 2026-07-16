// codespaces — Endpoints to manage Codespaces using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { NotFoundError } from '@pikku/core/errors'

export const CodespacesGetExportDetailsForAuthenticatedUserInput = z.object({
  codespace_name: z.string().describe("The name of the codespace."),
  export_id: z.string().describe("The ID of the export operation, or `latest`. Currently only `latest` is currently supported."),
})

export const CodespacesGetExportDetailsForAuthenticatedUserOutput = z.object({
  branch: z.string().nullable().optional().describe("Name of the exported branch"),
  completed_at: z.string().datetime().nullable().optional().describe("Completion time of the last export operation"),
  export_url: z.string().optional().describe("Url for fetching export details"),
  html_url: z.string().nullable().optional().describe("Web url for the exported branch"),
  id: z.string().optional().describe("Id for the export details"),
  sha: z.string().nullable().optional().describe("Git commit SHA of the exported branch"),
  state: z.string().nullable().optional().describe("State of the latest export"),
}).describe("An export of a codespace. Also, latest export details for a codespace can be fetched with id = latest")

export const codespacesGetExportDetailsForAuthenticatedUser = pikkuSessionlessFunc({
  description: "Gets information about an export of a codespace.\n\nYou must authenticate using a personal access token with the `codespace` scope to use this endpoint.\n\nGitHub Apps must have read access to the `codespaces_lifecycle_admin` repository permission to use this endpoint.",
  input: CodespacesGetExportDetailsForAuthenticatedUserInput,
  output: CodespacesGetExportDetailsForAuthenticatedUserOutput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/user/codespaces/{codespace_name}/exports/{export_id}", data) as any
  },
})
