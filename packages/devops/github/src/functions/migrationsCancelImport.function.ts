// migrations — Move projects to or from GitHub.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const MigrationsCancelImportInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
})

export const migrationsCancelImport = pikkuSessionlessFunc({
  description: "Stop an import for a repository.",
  input: MigrationsCancelImportInput,
  func: async ({ github }, data) => {
    return github.call("DELETE", "/repos/{owner}/{repo}/import", data)
  },
})
