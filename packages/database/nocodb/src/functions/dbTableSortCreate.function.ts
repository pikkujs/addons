import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const DbTableSortCreateInput = z.object({
  viewId: z.string().describe("Unique View ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  body: z.object({
  fk_column_id: z.string().min(0).max(20).optional().describe("Foreign Key to Column"),
  direction: z.enum(["asc", "desc"]).optional().describe("Sort direction"),
  fk_level_id: z.union([z.string(), z.unknown()]).optional().describe("Foreign Key to List View Level"),
  push_to_top: z.boolean().optional().describe("Push the sort to the top of the list"),
}),
})

export const DbTableSortCreateOutput = z.number()

export const dbTableSortCreate = pikkuSessionlessFunc({
  description: "Update the sort data in a given View",
  input: DbTableSortCreateInput,
  output: DbTableSortCreateOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v1/db/meta/views/{viewId}/sorts", data) as any
  },
})
