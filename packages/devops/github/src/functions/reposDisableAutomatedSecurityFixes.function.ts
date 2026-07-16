// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ReposDisableAutomatedSecurityFixesInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
})

export const reposDisableAutomatedSecurityFixes = pikkuSessionlessFunc({
  description: "Disables automated security fixes for a repository. The authenticated user must have admin access to the repository. For more information, see \"[Configuring automated security fixes](https://docs.github.com/articles/configuring-automated-security-fixes)\".",
  input: ReposDisableAutomatedSecurityFixesInput,
  func: async ({ github }, data) => {
    return github.call("DELETE", "/repos/{owner}/{repo}/automated-security-fixes", data)
  },
})
