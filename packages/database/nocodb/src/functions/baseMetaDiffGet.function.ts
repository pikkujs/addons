import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const BaseMetaDiffGetInput = z.object({
  baseId: z.string().min(0).max(20).describe("Model for ID").describe("Unique Base ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const BaseMetaDiffGetOutput = z.array(z.object({
  table_name: z.string().optional().describe("Table Name"),
  source_id: z.string().optional().describe("Source ID"),
  type: z.string().optional().describe("Change Type"),
  detectedChanges: z.array(z.record(z.string(), z.unknown())).optional().describe("Detected Changes"),
}))

export const baseMetaDiffGet = pikkuSessionlessFunc({
  description: "Get the meta data difference between NC_DB and external data sources",
  input: BaseMetaDiffGetInput,
  output: BaseMetaDiffGetOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/db/meta/projects/{baseId}/meta-diff", data) as any
  },
})
