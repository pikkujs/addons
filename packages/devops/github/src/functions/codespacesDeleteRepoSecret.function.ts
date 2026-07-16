// codespaces — Endpoints to manage Codespaces using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CodespacesDeleteRepoSecretInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  secret_name: z.string().describe("The name of the secret."),
})

export const codespacesDeleteRepoSecret = pikkuSessionlessFunc({
  description: "Deletes a secret in a repository using the secret name. You must authenticate using an access token with the `repo` scope to use this endpoint. GitHub Apps must have write access to the `codespaces_secrets` repository permission to use this endpoint.",
  input: CodespacesDeleteRepoSecretInput,
  func: async ({ github }, data) => {
    return github.call("DELETE", "/repos/{owner}/{repo}/codespaces/secrets/{secret_name}", data)
  },
})
