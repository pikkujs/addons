// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ReposRemoveCollaboratorInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  username: z.string().describe("The handle for the GitHub user account."),
})

export const reposRemoveCollaborator = pikkuSessionlessFunc({
  input: ReposRemoveCollaboratorInput,
  func: async ({ github }, data) => {
    return github.call("DELETE", "/repos/{owner}/{repo}/collaborators/{username}", data)
  },
})
