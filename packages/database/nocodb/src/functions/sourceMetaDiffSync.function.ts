import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const SourceMetaDiffSyncInput = z.object({
  baseId: z.string().min(0).max(20).describe("Model for ID").describe("Unique Base ID"),
  sourceId: z.string().regex(new RegExp("ds_j04jmxh5xg10lu")).describe("Unique Source ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const SourceMetaDiffSyncOutput = z.object({
  msg: z.string().optional(),
})

export const sourceMetaDiffSync = pikkuSessionlessFunc({
  description: "Synchronise the meta data difference between NC_DB and external data sources in a given Source",
  input: SourceMetaDiffSyncInput,
  output: SourceMetaDiffSyncOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v1/db/meta/projects/{baseId}/meta-diff/{sourceId}", data) as any
  },
})
