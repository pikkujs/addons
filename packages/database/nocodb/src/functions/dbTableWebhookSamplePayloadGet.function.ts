import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const DbTableWebhookSamplePayloadGetInput = z.object({
  tableId: z.string().min(0).max(20).describe("Model for ID").describe("Unique Table ID"),
  event: z.enum(["field", "view", "after", "before", "manual"]).describe("Hook Event"),
  operation: z.enum(["insert", "update", "delete", "bulkInsert", "bulkUpdate", "bulkDelete"]).describe("Hook Operation"),
  version: z.enum(["v1", "v2", "v3"]).describe("Hook Version"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const DbTableWebhookSamplePayloadGetOutput = z.object({
  data: z.record(z.string(), z.unknown()).optional().describe("Sample Payload Data"),
})

export const dbTableWebhookSamplePayloadGet = pikkuSessionlessFunc({
  description: "Get the sample hook payload",
  input: DbTableWebhookSamplePayloadGetInput,
  output: DbTableWebhookSamplePayloadGetOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/db/meta/tables/{tableId}/hooks/samplePayload/{event}/{operation}/{version}", data) as any
  },
})
