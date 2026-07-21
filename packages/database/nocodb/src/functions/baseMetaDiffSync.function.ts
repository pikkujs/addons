import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const BaseMetaDiffSyncInput = z.object({
  baseId: z.string().min(0).max(20).describe("Model for ID").describe("Unique Base ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const BaseMetaDiffSyncOutput = z.object({
  msg: z.string().optional(),
})

export const baseMetaDiffSync = pikkuSessionlessFunc({
  description: "Synchronise the meta data difference between NC_DB and external data sources",
  input: BaseMetaDiffSyncInput,
  output: BaseMetaDiffSyncOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v1/db/meta/projects/{baseId}/meta-diff", data) as any
  },
})
