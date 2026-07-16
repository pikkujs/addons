import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const PublicDataTableBulkDataListInput = z.object({
  sharedViewUuid: z.string().describe("Shared View UUID"),
  where: z.string().optional().describe("Extra filtering"),
  "xc-password": z.string().optional().describe("Shared view password"),
  body: z.array(z.record(z.string(), z.unknown())),
})

export const PublicDataTableBulkDataListOutput = z.record(z.string(), z.unknown())

export const publicDataTableBulkDataList = pikkuSessionlessFunc({
  description: "Read bulk data from a given table with provided filters",
  input: PublicDataTableBulkDataListInput,
  output: PublicDataTableBulkDataListOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v2/public/shared-view/{sharedViewUuid}/bulk/dataList", data) as any
  },
})
