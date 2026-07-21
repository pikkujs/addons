// migrations — Move projects to or from GitHub.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const MigrationsUnlockRepoForAuthenticatedUserInput = z.object({
  migration_id: z.number().int().describe("The unique identifier of the migration."),
  repo_name: z.string().describe("repo_name parameter"),
})

export const migrationsUnlockRepoForAuthenticatedUser = pikkuSessionlessFunc({
  description: "Unlocks a repository. You can lock repositories when you [start a user migration](https://docs.github.com/rest/migrations/users#start-a-user-migration). Once the migration is complete you can unlock each repository to begin using it again or [delete the repository](https://docs.github.com/rest/repos/repos#delete-a-repository) if you no longer need the source data. Returns a status of `404 Not Found` if the repository is not locked.",
  input: MigrationsUnlockRepoForAuthenticatedUserInput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ github }, data) => {
    return github.call("DELETE", "/user/migrations/{migration_id}/repos/{repo_name}/lock", data)
  },
})
