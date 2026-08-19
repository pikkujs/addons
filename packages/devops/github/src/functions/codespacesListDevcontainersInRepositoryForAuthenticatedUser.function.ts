// codespaces — Endpoints to manage Codespaces using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, InternalServerError } from '@pikku/core/errors'

export const CodespacesListDevcontainersInRepositoryForAuthenticatedUserInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const CodespacesListDevcontainersInRepositoryForAuthenticatedUserOutput = z.object({
  devcontainers: z.array(z.object({
    name: z.string().optional(),
    path: z.string(),
  })),
  total_count: z.number().int(),
})

export const codespacesListDevcontainersInRepositoryForAuthenticatedUser = pikkuSessionlessFunc({
  description: "Lists the devcontainer.json files associated with a specified repository and the authenticated user. These files\nspecify launchpoint configurations for codespaces created within the repository.\n\nYou must authenticate using an access token with the `codespace` scope to use this endpoint.\n\nGitHub Apps must have read access to the `codespaces_metadata` repository permission to use this endpoint.",
  input: CodespacesListDevcontainersInRepositoryForAuthenticatedUserInput,
  output: CodespacesListDevcontainersInRepositoryForAuthenticatedUserOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, InternalServerError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/codespaces/devcontainers", data) as any
  },
})
