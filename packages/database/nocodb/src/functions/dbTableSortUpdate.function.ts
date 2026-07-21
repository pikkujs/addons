import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const DbTableSortUpdateInput = z.object({
  sortId: z.string().describe("Unique Sort ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  fk_column_id: z.string().min(0).max(20).optional().describe("Foreign Key to Column"),
  direction: z.enum(["asc", "desc"]).optional().describe("Sort direction"),
  fk_level_id: z.union([z.string(), z.unknown()]).optional().describe("Foreign Key to List View Level"),
})

export const DbTableSortUpdateOutput = z.number()

export const dbTableSortUpdate = pikkuSessionlessFunc({
  description: "Update the sort data by Sort ID",
  input: DbTableSortUpdateInput,
  output: DbTableSortUpdateOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("PATCH", "/api/v1/db/meta/sorts/{sortId}", data) as any
  },
})
