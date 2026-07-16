import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const PublicDataCreateInput = z.object({
  sharedViewUuid: z.string().describe("Shared View UUID"),
  "xc-password": z.string().optional().describe("Shared view password"),
})

export const PublicDataCreateOutput = z.record(z.string(), z.unknown())

export const publicDataCreate = pikkuSessionlessFunc({
  description: "Create a new row for the target shared view",
  input: PublicDataCreateInput,
  output: PublicDataCreateOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v1/db/public/shared-view/{sharedViewUuid}/rows", data) as any
  },
})
