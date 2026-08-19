// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError } from '@pikku/core/errors'

export const ReposCheckCollaboratorInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  username: z.string().describe("The handle for the GitHub user account."),
})

export const reposCheckCollaborator = pikkuSessionlessFunc({
  description: "For organization-owned repositories, the list of collaborators includes outside collaborators, organization members that are direct collaborators, organization members with access through team memberships, organization members with access through default organization permissions, and organization owners.\n\nTeam members will include the members of child teams.\n\nYou must authenticate using an access token with the `read:org` and `repo` scopes with push access to use this\nendpoint. GitHub Apps must have the `members` organization permission and `metadata` repository permission to use this\nendpoint.",
  input: ReposCheckCollaboratorInput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/collaborators/{username}", data)
  },
})
