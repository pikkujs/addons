import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const DbTableWebhookCreateInput = z.object({
  tableId: z.string().min(0).max(20).describe("Model for ID").describe("Unique Table ID"),
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
})

export const DbTableWebhookCreateOutput = z.object({
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

export const dbTableWebhookCreate = pikkuSessionlessFunc({
  description: "Create a hook in the given table",
  input: DbTableWebhookCreateInput,
  output: DbTableWebhookCreateOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v1/db/meta/tables/{tableId}/hooks", data) as any
  },
})
