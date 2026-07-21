import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const DbViewShareDeleteInput = z.object({
  viewId: z.string().describe("Unique View ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const DbViewShareDeleteOutput = z.boolean()

export const dbViewShareDelete = pikkuSessionlessFunc({
  description: "Delete a shared view in a given View.",
  input: DbViewShareDeleteInput,
  output: DbViewShareDeleteOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("DELETE", "/api/v1/db/meta/views/{viewId}/share", data) as any
  },
})
