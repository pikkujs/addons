// migrations — Move projects to or from GitHub.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { NotFoundError } from '@pikku/core/errors'

export const MigrationsDownloadArchiveForOrgInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  migration_id: z.number().int().describe("The unique identifier of the migration."),
})

export const migrationsDownloadArchiveForOrg = pikkuSessionlessFunc({
  description: "Fetches the URL to a migration archive.",
  input: MigrationsDownloadArchiveForOrgInput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/orgs/{org}/migrations/{migration_id}/archive", data)
  },
})
