// actions — Endpoints to manage GitHub Actions using the REST API.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ActionsSetWorkflowAccessToRepositoryInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  access_level: z.enum(["none", "user", "organization"]).describe("Defines the level of access that workflows outside of the repository have to actions and reusable workflows within the\nrepository.\n\n`none` means the access is only possible from workflows in this repository. `user` level access allows sharing across user owned private repos only. `organization` level access allows sharing across the organization."),
})

export const actionsSetWorkflowAccessToRepository = pikkuSessionlessFunc({
  description: "Sets the level of access that workflows outside of the repository have to actions and reusable workflows in the repository.\nThis endpoint only applies to private repositories.\nFor more information, see \"[Allowing access to components in a private repository](https://docs.github.com/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository#allowing-access-to-components-in-a-private-repository)\".\n\nYou must authenticate using an access token with the `repo` scope to use this endpoint. GitHub Apps must have the\nrepository `administration` permission to use this endpoint.",
  input: ActionsSetWorkflowAccessToRepositoryInput,
  func: async ({ github }, data) => {
    return github.call("PUT", "/repos/{owner}/{repo}/actions/permissions/access", data)
  },
})
