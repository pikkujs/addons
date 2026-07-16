// dependabot — Endpoints to manage Dependabot.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DependabotDeleteRepoSecretInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  secret_name: z.string().describe("The name of the secret."),
})

export const dependabotDeleteRepoSecret = pikkuSessionlessFunc({
  description: "Deletes a secret in a repository using the secret name. You must authenticate using an access token with the `repo` scope to use this endpoint. GitHub Apps must have the `dependabot_secrets` repository permission to use this endpoint.",
  input: DependabotDeleteRepoSecretInput,
  func: async ({ github }, data) => {
    return github.call("DELETE", "/repos/{owner}/{repo}/dependabot/secrets/{secret_name}", data)
  },
})
