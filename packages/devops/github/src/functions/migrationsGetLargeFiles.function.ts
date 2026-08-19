// migrations — Move projects to or from GitHub.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const MigrationsGetLargeFilesInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
})

export const MigrationsGetLargeFilesOutput = z.array(z.object({
  oid: z.string(),
  path: z.string(),
  ref_name: z.string(),
  size: z.number().int(),
}))

export const migrationsGetLargeFiles = pikkuSessionlessFunc({
  description: "List files larger than 100MB found during the import",
  input: MigrationsGetLargeFilesInput,
  output: MigrationsGetLargeFilesOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/import/large_files", data) as any
  },
})
