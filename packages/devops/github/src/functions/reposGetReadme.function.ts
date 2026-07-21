// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { NotFoundError, UnprocessableContentError } from '@pikku/core/errors'

export const ReposGetReadmeInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  ref: z.string().optional().describe("The name of the commit/branch/tag. Default: the repository’s default branch (usually `master`)"),
})

export const ReposGetReadmeOutput = z.object({
  _links: z.object({
    git: z.string().url().nullable(),
    html: z.string().url().nullable(),
    self: z.string().url(),
  }),
  content: z.string(),
  download_url: z.string().url().nullable(),
  encoding: z.string(),
  git_url: z.string().url().nullable(),
  html_url: z.string().url().nullable(),
  name: z.string(),
  path: z.string(),
  sha: z.string(),
  size: z.number().int(),
  submodule_git_url: z.string().optional(),
  target: z.string().optional(),
  type: z.literal("file"),
  url: z.string().url(),
}).describe("Content File")

export const reposGetReadme = pikkuSessionlessFunc({
  description: "Gets the preferred README for a repository.\n\nREADMEs support [custom media types](https://docs.github.com/rest/reference/repos#custom-media-types) for retrieving the raw content or rendered HTML.",
  input: ReposGetReadmeInput,
  output: ReposGetReadmeOutput,
  errors: [NotFoundError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/readme", data) as any
  },
})
