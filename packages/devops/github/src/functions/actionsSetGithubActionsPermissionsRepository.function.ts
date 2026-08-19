// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ActionsSetGithubActionsPermissionsRepositoryInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  allowed_actions: z.enum(["all", "local_only", "selected"]).optional().describe("The permissions policy that controls the actions and reusable workflows that are allowed to run."),
  enabled: z.boolean().describe("Whether GitHub Actions is enabled on the repository."),
})

export const actionsSetGithubActionsPermissionsRepository = pikkuSessionlessFunc({
  description: "Sets the GitHub Actions permissions policy for enabling GitHub Actions and allowed actions and reusable workflows in the repository.\n\nYou must authenticate using an access token with the `repo` scope to use this endpoint. GitHub Apps must have the `administration` repository permission to use this API.",
  input: ActionsSetGithubActionsPermissionsRepositoryInput,
  func: async ({ github }, data) => {
    return github.call("PUT", "/repos/{owner}/{repo}/actions/permissions", data)
  },
})
