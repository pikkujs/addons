// migrations — Move projects to or from GitHub.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { NotFoundError } from '@pikku/core/errors'

export const MigrationsUnlockRepoForOrgInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  migration_id: z.number().int().describe("The unique identifier of the migration."),
  repo_name: z.string().describe("repo_name parameter"),
})

export const migrationsUnlockRepoForOrg = pikkuSessionlessFunc({
  description: "Unlocks a repository that was locked for migration. You should unlock each migrated repository and [delete them](https://docs.github.com/rest/repos/repos#delete-a-repository) when the migration is complete and you no longer need the source data.",
  input: MigrationsUnlockRepoForOrgInput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("DELETE", "/orgs/{org}/migrations/{migration_id}/repos/{repo_name}/lock", data)
  },
})
