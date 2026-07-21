import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const DbTableWebhookDeleteInput = z.object({
  hookId: z.string().describe("Unique Hook ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const DbTableWebhookDeleteOutput = z.boolean()

export const dbTableWebhookDelete = pikkuSessionlessFunc({
  description: "Delete the exsiting hook by its ID",
  input: DbTableWebhookDeleteInput,
  output: DbTableWebhookDeleteOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("DELETE", "/api/v1/db/meta/hooks/{hookId}", data) as any
  },
})
