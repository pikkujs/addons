// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError, ConflictError, UnprocessableContentError } from '@pikku/core/errors'

export const ReposDeletePagesSiteInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
})

export const reposDeletePagesSite = pikkuSessionlessFunc({
  description: "Deletes a GitHub Pages site. For more information, see \"[About GitHub Pages](/github/working-with-github-pages/about-github-pages).\n\nTo use this endpoint, you must be a repository administrator, maintainer, or have the 'manage GitHub Pages settings' permission. A token with the `repo` scope or Pages write permission is required. GitHub Apps must have the `administration:write` and `pages:write` permissions.",
  input: ReposDeletePagesSiteInput,
  errors: [NotFoundError, ConflictError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("DELETE", "/repos/{owner}/{repo}/pages", data)
  },
})
