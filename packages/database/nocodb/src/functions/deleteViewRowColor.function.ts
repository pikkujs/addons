import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const DeleteViewRowColorInput = z.object({
  viewId: z.string().min(0).max(20).describe("Model for ID").describe("Unique View ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const deleteViewRowColor = pikkuSessionlessFunc({
  description: "Delete the row color info from view.",
  input: DeleteViewRowColorInput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("DELETE", "/api/v1/db/meta/views/{viewId}/row-color", data)
  },
})
