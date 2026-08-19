// migrations — Move projects to or from GitHub.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError } from '@pikku/core/errors'

export const MigrationsGetCommitAuthorsInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  since: z.number().int().optional().describe("A user ID. Only return users with an ID greater than this ID."),
})

export const MigrationsGetCommitAuthorsOutput = z.array(z.object({
  email: z.string(),
  id: z.number().int(),
  import_url: z.string().url(),
  name: z.string(),
  remote_id: z.string(),
  remote_name: z.string(),
  url: z.string().url(),
}))

export const migrationsGetCommitAuthors = pikkuSessionlessFunc({
  description: "Each type of source control system represents authors in a different way. For example, a Git commit author has a display name and an email address, but a Subversion commit author just has a username. The GitHub Importer will make the author information valid, but the author might not be correct. For example, it will change the bare Subversion username `hubot` into something like `hubot <hubot@12341234-abab-fefe-8787-fedcba987654>`.\n\nThis endpoint and the [Map a commit author](https://docs.github.com/rest/migrations/source-imports#map-a-commit-author) endpoint allow you to provide correct Git author information.",
  input: MigrationsGetCommitAuthorsInput,
  output: MigrationsGetCommitAuthorsOutput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/import/authors", data) as any
  },
})
