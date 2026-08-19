// migrations — Move projects to or from GitHub.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError, UnprocessableContentError } from '@pikku/core/errors'

export const MigrationsMapCommitAuthorInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  author_id: z.number().int(),
  email: z.string().optional().describe("The new Git author email."),
  name: z.string().optional().describe("The new Git author name."),
})

export const MigrationsMapCommitAuthorOutput = z.object({
  email: z.string(),
  id: z.number().int(),
  import_url: z.string().url(),
  name: z.string(),
  remote_id: z.string(),
  remote_name: z.string(),
  url: z.string().url(),
}).describe("Porter Author")

export const migrationsMapCommitAuthor = pikkuSessionlessFunc({
  description: "Update an author's identity for the import. Your application can continue updating authors any time before you push new commits to the repository.",
  input: MigrationsMapCommitAuthorInput,
  output: MigrationsMapCommitAuthorOutput,
  errors: [NotFoundError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("PATCH", "/repos/{owner}/{repo}/import/authors/{author_id}", data) as any
  },
})
