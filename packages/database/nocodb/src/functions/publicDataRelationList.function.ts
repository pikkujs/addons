import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const PublicDataRelationListInput = z.object({
  sharedViewUuid: z.string().describe("Shared View UUID"),
  columnName: z.string().describe("Column Name"),
  fields: z.array(z.unknown()).optional().describe("Which fields to be shown"),
  sort: z.union([z.array(z.string()), z.string()]).optional().describe("The result will be sorted based on `sort` query"),
  where: z.string().optional().describe("Extra filtering"),
  offset: z.number().int().min(0).optional().describe("Offset in rows"),
  limit: z.number().int().min(1).optional().describe("Limit in rows"),
  sortArrJson: z.string().optional().describe("Used for multiple sort queries"),
  filterArrJson: z.string().optional().describe("Used for multiple filter queries"),
  "xc-password": z.string().optional().describe("Shared view password"),
})

export const PublicDataRelationListOutput = z.unknown()

export const publicDataRelationList = pikkuSessionlessFunc({
  description: "List Nested Data Relation",
  input: PublicDataRelationListInput,
  output: PublicDataRelationListOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/db/public/shared-view/{sharedViewUuid}/nested/{columnName}", data) as any
  },
})
