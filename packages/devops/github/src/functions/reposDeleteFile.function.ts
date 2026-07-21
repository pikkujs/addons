// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { NotFoundError, ConflictError, UnprocessableContentError } from '@pikku/core/errors'

export const ReposDeleteFileInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  path: z.string().describe("path parameter"),
  author: z.object({
  email: z.string().optional().describe("The email of the author (or committer) of the commit"),
  name: z.string().optional().describe("The name of the author (or committer) of the commit"),
}).optional().describe("object containing information about the author."),
  branch: z.string().optional().describe("The branch name. Default: the repository’s default branch (usually `master`)"),
  committer: z.object({
  email: z.string().optional().describe("The email of the author (or committer) of the commit"),
  name: z.string().optional().describe("The name of the author (or committer) of the commit"),
}).optional().describe("object containing information about the committer."),
  message: z.string().describe("The commit message."),
  sha: z.string().describe("The blob SHA of the file being deleted."),
})

export const ReposDeleteFileOutput = z.object({
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

export const reposDeleteFile = pikkuSessionlessFunc({
  description: "Deletes a file in a repository.\n\nYou can provide an additional `committer` parameter, which is an object containing information about the committer. Or, you can provide an `author` parameter, which is an object containing information about the author.\n\nThe `author` section is optional and is filled in with the `committer` information if omitted. If the `committer` information is omitted, the authenticated user's information is used.\n\nYou must provide values for both `name` and `email`, whether you choose to use `author` or `committer`. Otherwise, you'll receive a `422` status code.\n\n**Note:** If you use this endpoint and the \"[Create or update file contents](https://docs.github.com/rest/reference/repos/#create-or-update-file-contents)\" endpoint in parallel, the concurrent requests will conflict and you will receive errors. You must use these endpoints serially instead.",
  input: ReposDeleteFileInput,
  output: ReposDeleteFileOutput,
  errors: [NotFoundError, ConflictError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("DELETE", "/repos/{owner}/{repo}/contents/{path}", data) as any
  },
})
