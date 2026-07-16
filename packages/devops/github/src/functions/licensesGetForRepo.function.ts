// licenses — View various OSS licenses.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const LicensesGetForRepoInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
})

export const LicensesGetForRepoOutput = z.object({
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
  license: z.object({
    html_url: z.string().url().optional(),
    key: z.string(),
    name: z.string(),
    node_id: z.string(),
    spdx_id: z.string().nullable(),
    url: z.string().url().nullable(),
  }).nullable().describe("License Simple"),
  name: z.string(),
  path: z.string(),
  sha: z.string(),
  size: z.number().int(),
  type: z.string(),
  url: z.string().url(),
}).describe("License Content")

export const licensesGetForRepo = pikkuSessionlessFunc({
  description: "This method returns the contents of the repository's license file, if one is detected.\n\nSimilar to [Get repository content](https://docs.github.com/rest/reference/repos#get-repository-content), this method also supports [custom media types](https://docs.github.com/rest/overview/media-types) for retrieving the raw license content or rendered license HTML.",
  input: LicensesGetForRepoInput,
  output: LicensesGetForRepoOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/license", data) as any
  },
})
