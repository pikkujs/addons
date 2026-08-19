// issues — Interact with GitHub Issues.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const IssuesDeleteLabelInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  name: z.string(),
})

export const issuesDeleteLabel = pikkuSessionlessFunc({
  input: IssuesDeleteLabelInput,
  func: async ({ github }, data) => {
    return github.call("DELETE", "/repos/{owner}/{repo}/labels/{name}", data)
  },
})
