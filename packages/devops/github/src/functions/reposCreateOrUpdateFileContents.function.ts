// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError, ConflictError, UnprocessableContentError } from '@pikku/core/errors'

export const ReposCreateOrUpdateFileContentsInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  path: z.string().describe("path parameter"),
  author: z.object({
  date: z.string().optional(),
  email: z.string().describe("The email of the author or committer of the commit. You'll receive a `422` status code if `email` is omitted."),
  name: z.string().describe("The name of the author or committer of the commit. You'll receive a `422` status code if `name` is omitted."),
}).optional().describe("The author of the file. Default: The `committer` or the authenticated user if you omit `committer`."),
  branch: z.string().optional().describe("The branch name. Default: the repository’s default branch (usually `master`)"),
  committer: z.object({
  date: z.string().optional(),
  email: z.string().describe("The email of the author or committer of the commit. You'll receive a `422` status code if `email` is omitted."),
  name: z.string().describe("The name of the author or committer of the commit. You'll receive a `422` status code if `name` is omitted."),
}).optional().describe("The person that committed the file. Default: the authenticated user."),
  content: z.string().describe("The new file content, using Base64 encoding."),
  message: z.string().describe("The commit message."),
  sha: z.string().optional().describe("**Required if you are updating a file**. The blob SHA of the file being replaced."),
})

export const ReposCreateOrUpdateFileContentsOutput = z.object({
  commit: z.object({
    author: z.object({
      date: z.string().optional(),
      email: z.string().optional(),
      name: z.string().optional(),
    }).optional(),
    committer: z.object({
      date: z.string().optional(),
      email: z.string().optional(),
      name: z.string().optional(),
    }).optional(),
    html_url: z.string().optional(),
    message: z.string().optional(),
    node_id: z.string().optional(),
    parents: z.array(z.object({
      html_url: z.string().optional(),
      sha: z.string().optional(),
      url: z.string().optional(),
    })).optional(),
    sha: z.string().optional(),
    tree: z.object({
      sha: z.string().optional(),
      url: z.string().optional(),
    }).optional(),
    url: z.string().optional(),
    verification: z.object({
      payload: z.string().nullable().optional(),
      reason: z.string().optional(),
      signature: z.string().nullable().optional(),
      verified: z.boolean().optional(),
    }).optional(),
  }),
  content: z.object({
    _links: z.object({
      git: z.string().optional(),
      html: z.string().optional(),
      self: z.string().optional(),
    }).optional(),
    download_url: z.string().optional(),
    git_url: z.string().optional(),
    html_url: z.string().optional(),
    name: z.string().optional(),
    path: z.string().optional(),
    sha: z.string().optional(),
    size: z.number().int().optional(),
    type: z.string().optional(),
    url: z.string().optional(),
  }).nullable(),
}).describe("File Commit")

export const reposCreateOrUpdateFileContents = pikkuSessionlessFunc({
  description: "Creates a new file or replaces an existing file in a repository. You must authenticate using an access token with the `workflow` scope to use this endpoint.\n\n**Note:** If you use this endpoint and the \"[Delete a file](https://docs.github.com/rest/reference/repos/#delete-file)\" endpoint in parallel, the concurrent requests will conflict and you will receive errors. You must use these endpoints serially instead.",
  input: ReposCreateOrUpdateFileContentsInput,
  output: ReposCreateOrUpdateFileContentsOutput,
  errors: [NotFoundError, ConflictError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("PUT", "/repos/{owner}/{repo}/contents/{path}", data) as any
  },
})
