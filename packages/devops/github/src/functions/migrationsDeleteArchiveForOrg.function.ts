// migrations — Move projects to or from GitHub.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError } from '@pikku/core/errors'

export const MigrationsDeleteArchiveForOrgInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  migration_id: z.number().int().describe("The unique identifier of the migration."),
})

export const migrationsDeleteArchiveForOrg = pikkuSessionlessFunc({
  description: "Deletes a previous migration archive. Migration archives are automatically deleted after seven days.",
  input: MigrationsDeleteArchiveForOrgInput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("DELETE", "/orgs/{org}/migrations/{migration_id}/archive", data)
  },
})
