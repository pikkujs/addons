import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const DbTableWebhookListInput = z.object({
  tableId: z.string().min(0).max(20).describe("Model for ID").describe("Unique Table ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const DbTableWebhookListOutput = z.object({
  list: z.array(z.object({
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
  })).min(1).describe("List of hook objects"),
  pageInfo: z.object({
    isFirstPage: z.boolean().optional().describe("Is the current page the first page"),
    isLastPage: z.boolean().optional().describe("Is the current page the last page"),
    page: z.number().optional().describe("The current page"),
    offset: z.number().optional().describe("The current offset and it will be present only when the page is not included"),
    pageSize: z.number().optional().describe("The number of pages"),
    totalRows: z.number().optional().describe("The number of rows in the given result"),
  }).describe("Model for Paginated"),
}).describe("Model for Hook List")

export const dbTableWebhookList = pikkuSessionlessFunc({
  description: "List all hook records in the given Table",
  input: DbTableWebhookListInput,
  output: DbTableWebhookListOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/db/meta/tables/{tableId}/hooks", data) as any
  },
})
