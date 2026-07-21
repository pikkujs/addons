import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const DbTableWebhookUpdateInput = z.object({
  hookId: z.string().describe("Unique Hook ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  active: z.union([z.number().int(), z.boolean(), z.unknown()]).optional().describe("Is the hook active?"),
  async: z.union([z.number().int(), z.boolean(), z.unknown()]).optional().describe("Is the hook aysnc?"),
  description: z.string().optional().describe("Hook Description"),
  env: z.string().optional().describe("Environment for the hook"),
  event: z.enum(["view", "field", "after", "before", "manual"]).optional().describe("Event Type for the operation"),
  fk_model_id: z.string().optional().describe("Foreign Key to Model"),
  id: z.string().min(0).max(20).optional().describe("Unique ID"),
  notification: z.unknown().optional().describe("Hook Notification including info such as type, payload, method, body, and etc"),
  operation: z.array(z.enum(["insert", "update", "delete", "trigger"])).optional().describe("Hook Operation"),
  retries: z.number().optional().describe("Retry Count"),
  retry_interval: z.number().optional().describe("Retry Interval"),
  timeout: z.number().optional().describe("Timeout"),
  title: z.string().optional().describe("Hook Title"),
  type: z.string().optional().describe("Hook Type"),
  version: z.enum(["v1", "v2", "v3"]).optional().describe("Hook Version"),
  trigger_field: z.boolean().optional().describe("Is this hook only trigger when some fields are affected"),
  trigger_fields: z.array(z.string()).optional(),
})

export const DbTableWebhookUpdateOutput = z.object({
  active: z.union([z.number().int(), z.boolean(), z.unknown()]).optional().describe("Is the hook active?"),
  async: z.union([z.number().int(), z.boolean(), z.unknown()]).optional().describe("Is the hook aysnc?"),
  description: z.string().optional().describe("Hook Description"),
  env: z.string().optional().describe("Environment for the hook"),
  event: z.enum(["view", "field", "after", "before", "manual"]).optional().describe("Event Type for the operation"),
  fk_model_id: z.string().optional().describe("Foreign Key to Model"),
  id: z.string().min(0).max(20).optional().describe("Unique ID"),
  notification: z.unknown().optional().describe("Hook Notification including info such as type, payload, method, body, and etc"),
  operation: z.array(z.enum(["insert", "update", "delete", "trigger"])).optional().describe("Hook Operation"),
  retries: z.number().optional().describe("Retry Count"),
  retry_interval: z.number().optional().describe("Retry Interval"),
  timeout: z.number().optional().describe("Timeout"),
  title: z.string().optional().describe("Hook Title"),
  type: z.string().optional().describe("Hook Type"),
  version: z.enum(["v1", "v2", "v3"]).optional().describe("Hook Version"),
  trigger_field: z.boolean().optional().describe("Is this hook only trigger when some fields are affected"),
  trigger_fields: z.array(z.string()).optional(),
}).describe("Model for Hook")

export const dbTableWebhookUpdate = pikkuSessionlessFunc({
  description: "Update the exsiting hook by its ID",
  input: DbTableWebhookUpdateInput,
  output: DbTableWebhookUpdateOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("PATCH", "/api/v1/db/meta/hooks/{hookId}", data) as any
  },
})
