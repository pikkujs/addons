import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const PublicDataGroupByCountInput = z.object({
  sharedViewUuid: z.string().describe("Shared View UUID"),
  sort: z.union([z.array(z.string()), z.string()]).optional().describe("The result will be sorted based on `sort` query"),
  where: z.string().optional().describe("Extra filtering"),
  filterArrJson: z.string().optional().describe("Used for multiple filter queries"),
  column_name: z.string().optional().describe("Columns to group by"),
  "xc-password": z.string().optional().describe("Shared view password"),
})

export const PublicDataGroupByCountOutput = z.unknown()

export const publicDataGroupByCount = pikkuSessionlessFunc({
  description: "Get the number of groups by the given query",
  input: PublicDataGroupByCountInput,
  output: PublicDataGroupByCountOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v2/public/shared-view/{sharedViewUuid}/groupby/count", data) as any
  },
})
