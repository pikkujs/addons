// migrations — Move projects to or from GitHub.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const MigrationsDeleteArchiveForAuthenticatedUserInput = z.object({
  migration_id: z.number().int().describe("The unique identifier of the migration."),
})

export const migrationsDeleteArchiveForAuthenticatedUser = pikkuSessionlessFunc({
  description: "Deletes a previous migration archive. Downloadable migration archives are automatically deleted after seven days. Migration metadata, which is returned in the [List user migrations](https://docs.github.com/rest/migrations/users#list-user-migrations) and [Get a user migration status](https://docs.github.com/rest/migrations/users#get-a-user-migration-status) endpoints, will continue to be available even after an archive is deleted.",
  input: MigrationsDeleteArchiveForAuthenticatedUserInput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("DELETE", "/user/migrations/{migration_id}/archive", data)
  },
})
