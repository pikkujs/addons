// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ActionsGetAllowedActionsRepositoryInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
})

export const ActionsGetAllowedActionsRepositoryOutput = z.object({
  github_owned_allowed: z.boolean().optional().describe("Whether GitHub-owned actions are allowed. For example, this includes the actions in the `actions` organization."),
  patterns_allowed: z.array(z.string()).optional().describe("Specifies a list of string-matching patterns to allow specific action(s) and reusable workflow(s). Wildcards, tags, and SHAs are allowed. For example, `monalisa/octocat@*`, `monalisa/octocat@v2`, `monalisa/*`.\n\n**Note**: The `patterns_allowed` setting only applies to public repositories."),
  verified_allowed: z.boolean().optional().describe("Whether actions from GitHub Marketplace verified creators are allowed. Set to `true` to allow all actions by GitHub Marketplace verified creators."),
})

export const actionsGetAllowedActionsRepository = pikkuSessionlessFunc({
  description: "Gets the settings for selected actions and reusable workflows that are allowed in a repository. To use this endpoint, the repository policy for `allowed_actions` must be configured to `selected`. For more information, see \"[Set GitHub Actions permissions for a repository](#set-github-actions-permissions-for-a-repository).\"\n\nYou must authenticate using an access token with the `repo` scope to use this endpoint. GitHub Apps must have the `administration` repository permission to use this API.",
  input: ActionsGetAllowedActionsRepositoryInput,
  output: ActionsGetAllowedActionsRepositoryOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/actions/permissions/selected-actions", data) as any
  },
})
