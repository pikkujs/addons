// dependabot — Endpoints to manage Dependabot.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DependabotListRepoSecretsInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const DependabotListRepoSecretsOutput = z.object({
  secrets: z.array(z.object({
    created_at: z.string().datetime(),
    name: z.string().describe("The name of the secret."),
    updated_at: z.string().datetime(),
  })),
  total_count: z.number().int(),
})

export const dependabotListRepoSecrets = pikkuSessionlessFunc({
  description: "Lists all secrets available in a repository without revealing their encrypted values. You must authenticate using an access token with the `repo` scope to use this endpoint. GitHub Apps must have the `dependabot_secrets` repository permission to use this endpoint.",
  input: DependabotListRepoSecretsInput,
  output: DependabotListRepoSecretsOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/dependabot/secrets", data) as any
  },
})
