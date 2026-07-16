// git — Raw Git functionality.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ForbiddenError, NotFoundError, ConflictError, UnprocessableContentError } from '@pikku/core/errors'

export const GitCreateBlobInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  content: z.string().describe("The new blob's content."),
  encoding: z.string().optional().default("utf-8").describe("The encoding used for `content`. Currently, `\"utf-8\"` and `\"base64\"` are supported."),
})

export const GitCreateBlobOutput = z.object({
  sha: z.string(),
  url: z.string(),
}).describe("Short Blob")

export const gitCreateBlob = pikkuSessionlessFunc({
  input: GitCreateBlobInput,
  output: GitCreateBlobOutput,
  errors: [ForbiddenError, NotFoundError, ConflictError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("POST", "/repos/{owner}/{repo}/git/blobs", data) as any
  },
})
