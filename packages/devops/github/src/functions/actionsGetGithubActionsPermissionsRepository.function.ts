// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ActionsGetGithubActionsPermissionsRepositoryInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
})

export const ActionsGetGithubActionsPermissionsRepositoryOutput = z.object({
  allowed_actions: z.enum(["all", "local_only", "selected"]).optional().describe("The permissions policy that controls the actions and reusable workflows that are allowed to run."),
  enabled: z.boolean().describe("Whether GitHub Actions is enabled on the repository."),
  selected_actions_url: z.string().optional().describe("The API URL to use to get or set the actions and reusable workflows that are allowed to run, when `allowed_actions` is set to `selected`."),
})

export const actionsGetGithubActionsPermissionsRepository = pikkuSessionlessFunc({
  description: "Gets the GitHub Actions permissions policy for a repository, including whether GitHub Actions is enabled and the actions and reusable workflows allowed to run in the repository.\n\nYou must authenticate using an access token with the `repo` scope to use this endpoint. GitHub Apps must have the `administration` repository permission to use this API.",
  input: ActionsGetGithubActionsPermissionsRepositoryInput,
  output: ActionsGetGithubActionsPermissionsRepositoryOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/actions/permissions", data) as any
  },
})
