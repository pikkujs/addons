import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const UtilsFeedInput = z.object({
  type: z.enum(["all", "github", "youtube", "cloud"]).optional(),
  per_page: z.number().optional(),
  page: z.number().optional(),
})

export const UtilsFeedOutput = z.array(z.object({
  Id: z.string().optional(),
  Description: z.string().optional(),
  Tags: z.string().optional(),
  Images: z.array(z.record(z.string(), z.unknown())).optional(),
  Url: z.string().optional(),
  "Published Time": z.string().optional(),
}))

export const utilsFeed = pikkuSessionlessFunc({
  input: UtilsFeedInput,
  output: UtilsFeedOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v2/feed", data) as any
  },
})
