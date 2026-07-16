// codespaces — Endpoints to manage Codespaces using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CodespacesGetRepoSecretInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  secret_name: z.string().describe("The name of the secret."),
})

export const CodespacesGetRepoSecretOutput = z.object({
  created_at: z.string().datetime(),
  name: z.string().describe("The name of the secret."),
  updated_at: z.string().datetime(),
}).describe("Set repository secrets for GitHub Codespaces.")

export const codespacesGetRepoSecret = pikkuSessionlessFunc({
  description: "Gets a single repository secret without revealing its encrypted value. You must authenticate using an access token with the `repo` scope to use this endpoint. GitHub Apps must have write access to the `codespaces_secrets` repository permission to use this endpoint.",
  input: CodespacesGetRepoSecretInput,
  output: CodespacesGetRepoSecretOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/codespaces/secrets/{secret_name}", data) as any
  },
})
