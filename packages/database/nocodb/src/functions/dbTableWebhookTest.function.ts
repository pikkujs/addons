import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const DbTableWebhookTestInput = z.object({
  tableId: z.string().min(0).max(20).describe("Model for ID").describe("Unique Table ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  hook: z.object({
  active: z.union([z.number().int(), z.boolean(), z.unknown()]).optional().describe("Is the hook active?"),
  async: z.union([z.number().int(), z.boolean(), z.unknown()]).optional().describe("Is the hook aysnc?"),
  description: z.union([z.string(), z.unknown()]).optional().describe("Hook Description"),
  env: z.string().optional().describe("Environment for the hook"),
  event: z.enum(["view", "field", "after", "before", "manual"]).describe("Event Type for the operation"),
  fk_model_id: z.string().optional().describe("Foreign Key to Model"),
  id: z.string().min(0).max(20).optional().describe("Unique ID"),
  notification: z.unknown().describe("Hook Notification including info such as type, payload, method, body, and etc"),
  operation: z.array(z.enum(["insert", "update", "delete", "trigger"])).describe("Hook Operation"),
  retries: z.number().optional().describe("Retry Count"),
  retry_interval: z.number().optional().describe("Retry Interval"),
  timeout: z.number().optional().describe("Timeout"),
  title: z.string().describe("Hook Title"),
  type: z.unknown().optional().describe("Hook Type"),
  condition: z.union([z.number().int(), z.boolean(), z.unknown()]).optional().describe("Is this hook assoicated with some filters"),
  trigger_field: z.boolean().optional().describe("Is this hook only trigger when some fields are affected"),
  trigger_fields: z.array(z.string()).optional(),
}).describe("Model for Hook"),
  payload: z.unknown().describe("Payload to be sent"),
})

export const DbTableWebhookTestOutput = z.object({
  msg: z.string().optional(),
})

export const dbTableWebhookTest = pikkuSessionlessFunc({
  description: "Test the hook in the given Table",
  input: DbTableWebhookTestInput,
  output: DbTableWebhookTestOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v1/db/meta/tables/{tableId}/hooks/test", data) as any
  },
})
