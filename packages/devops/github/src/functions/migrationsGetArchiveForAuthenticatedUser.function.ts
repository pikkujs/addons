// migrations — Move projects to or from GitHub.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const MigrationsGetArchiveForAuthenticatedUserInput = z.object({
  migration_id: z.number().int().describe("The unique identifier of the migration."),
})

export const migrationsGetArchiveForAuthenticatedUser = pikkuSessionlessFunc({
  description: "Fetches the URL to download the migration archive as a `tar.gz` file. Depending on the resources your repository uses, the migration archive can contain JSON files with data for these objects:\n\n*   attachments\n*   bases\n*   commit\\_comments\n*   issue\\_comments\n*   issue\\_events\n*   issues\n*   milestones\n*   organizations\n*   projects\n*   protected\\_branches\n*   pull\\_request\\_reviews\n*   pull\\_requests\n*   releases\n*   repositories\n*   review\\_comments\n*   schema\n*   users\n\nThe archive will also contain an `attachments` directory that includes all attachment files uploaded to GitHub.com and a `repositories` directory that contains the repository's Git data.",
  input: MigrationsGetArchiveForAuthenticatedUserInput,
  errors: [UnauthorizedError, ForbiddenError],
  func: async ({ github }, data) => {
    return github.call("GET", "/user/migrations/{migration_id}/archive", data)
  },
})
