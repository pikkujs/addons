import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const DbTableWebhookLogsListInput = z.object({
  hookId: z.string().min(0).max(20).describe("Model for ID").describe("Unique Hook ID"),
  limit: z.number().int().min(1).optional(),
  offset: z.number().int().min(0).optional(),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const DbTableWebhookLogsListOutput = z.object({
  list: z.array(z.object({
    source_id: z.string().optional().describe("Unique Source ID"),
    conditions: z.string().optional().describe("Hook Conditions"),
    error: z.union([z.string(), z.unknown()]).optional().describe("Error"),
    error_code: z.union([z.string(), z.unknown()]).optional().describe("Error Code"),
    error_message: z.union([z.string(), z.unknown()]).optional().describe("Error Message"),
    event: z.enum(["field", "view", "after", "before", "manual"]).optional().describe("Hook Event"),
    execution_time: z.string().optional().describe("Execution Time in milliseconds"),
    fk_hook_id: z.union([z.string(), z.unknown()]).optional().describe("Foreign Key to Hook"),
    id: z.union([z.string(), z.unknown()]).optional().describe("Unique ID"),
    notifications: z.string().optional().describe("Hook Notification"),
    operation: z.enum(["insert", "update", "delete", "trigger"]).optional().describe("Hook Operation"),
    payload: z.string().optional().describe("Hook Payload"),
    base_id: z.string().optional().describe("Base ID"),
    response: z.union([z.string(), z.unknown()]).optional().describe("Hook Response"),
    test_call: z.union([z.number().int(), z.boolean(), z.unknown()]).optional().describe("Is this testing hook call?"),
    triggered_by: z.union([z.string(), z.unknown()]).optional().describe("Who triggered the hook?"),
    type: z.string().optional().describe("Hook Type"),
  })).min(1).describe("List of hook objects"),
  pageInfo: z.object({
    isFirstPage: z.boolean().optional().describe("Is the current page the first page"),
    isLastPage: z.boolean().optional().describe("Is the current page the last page"),
    page: z.number().optional().describe("The current page"),
    offset: z.number().optional().describe("The current offset and it will be present only when the page is not included"),
    pageSize: z.number().optional().describe("The number of pages"),
    totalRows: z.number().optional().describe("The number of rows in the given result"),
  }).describe("Model for Paginated"),
}).describe("Model for Hook Log List")

export const dbTableWebhookLogsList = pikkuSessionlessFunc({
  description: "List the log data in a given Hook",
  input: DbTableWebhookLogsListInput,
  output: DbTableWebhookLogsListOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/db/meta/hooks/{hookId}/logs", data) as any
  },
})
