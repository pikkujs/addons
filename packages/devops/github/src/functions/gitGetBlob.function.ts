// git — Raw Git functionality.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { ForbiddenError, NotFoundError, UnprocessableContentError } from '@pikku/core/errors'

export const GitGetBlobInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  file_sha: z.string(),
})

export const GitGetBlobOutput = z.object({
  content: z.string(),
  encoding: z.string(),
  highlighted_content: z.string().optional(),
  node_id: z.string(),
  sha: z.string(),
  size: z.number().int().nullable(),
  url: z.string().url(),
}).describe("Blob")

export const gitGetBlob = pikkuSessionlessFunc({
  description: "The `content` in the response will always be Base64 encoded.\n\n_Note_: This API supports blobs up to 100 megabytes in size.",
  input: GitGetBlobInput,
  output: GitGetBlobOutput,
  errors: [ForbiddenError, NotFoundError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/git/blobs/{file_sha}", data) as any
  },
})
