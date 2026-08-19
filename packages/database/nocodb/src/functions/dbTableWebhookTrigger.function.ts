import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const DbTableWebhookTriggerInput = z.object({
  hookId: z.string().min(0).max(20).describe("Model for ID").describe("Unique Hook ID"),
  rowId: z.string().min(0).max(20).describe("Model for ID").describe("Unique Row ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const dbTableWebhookTrigger = pikkuSessionlessFunc({
  description: "Trigger the manual WebHook",
  input: DbTableWebhookTriggerInput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v2/meta/hooks/{hookId}/trigger/{rowId}", data)
  },
})
