// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ConflictError } from '@pikku/core/errors'

export const ActionsSetGithubActionsDefaultWorkflowPermissionsRepositoryInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  can_approve_pull_request_reviews: z.boolean().optional().describe("Whether GitHub Actions can approve pull requests. Enabling this can be a security risk."),
  default_workflow_permissions: z.enum(["read", "write"]).optional().describe("The default workflow permissions granted to the GITHUB_TOKEN when running workflows."),
})

export const actionsSetGithubActionsDefaultWorkflowPermissionsRepository = pikkuSessionlessFunc({
  description: "Sets the default workflow permissions granted to the `GITHUB_TOKEN` when running workflows in a repository, and sets if GitHub Actions\ncan submit approving pull request reviews.\nFor more information, see \"[Setting the permissions of the GITHUB_TOKEN for your repository](https://docs.github.com/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository#setting-the-permissions-of-the-github_token-for-your-repository).\"\n\nYou must authenticate using an access token with the `repo` scope to use this endpoint. GitHub Apps must have the repository `administration` permission to use this API.",
  input: ActionsSetGithubActionsDefaultWorkflowPermissionsRepositoryInput,
  errors: [ConflictError],
  func: async ({ github }, data) => {
    return github.call("PUT", "/repos/{owner}/{repo}/actions/permissions/workflow", data)
  },
})
