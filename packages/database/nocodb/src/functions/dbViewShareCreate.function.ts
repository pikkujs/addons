import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const DbViewShareCreateInput = z.object({
  viewId: z.string().describe("Unique View ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const DbViewShareCreateOutput = z.object({
  meta: z.union([z.unknown(), z.record(z.string(), z.unknown()), z.string()]).optional().describe("Meta data passing to Shared View such as if download is allowed or not."),
  password: z.union([z.string(), z.unknown()]).optional().describe("Password to restrict access"),
}).describe("Model for Shared View Request")

export const dbViewShareCreate = pikkuSessionlessFunc({
  description: "Create a shared view in a given View..",
  input: DbViewShareCreateInput,
  output: DbViewShareCreateOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v1/db/meta/views/{viewId}/share", data) as any
  },
})
