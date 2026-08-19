import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const BaseModelVisibilitySetInput = z.object({
  baseId: z.string().min(0).max(20).describe("Model for ID").describe("Unique Base ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  body: z.array(z.object({
  id: z.union([z.string(), z.unknown()]).optional(),
  disabled: z.object({
    commenter: z.union([z.number().int(), z.boolean(), z.unknown()]).optional().describe("Model for Bool"),
    creator: z.union([z.number().int(), z.boolean(), z.unknown()]).optional().describe("Model for Bool"),
    editor: z.union([z.number().int(), z.boolean(), z.unknown()]).optional().describe("Model for Bool"),
    guest: z.union([z.number().int(), z.boolean(), z.unknown()]).optional().describe("Model for Bool"),
    owner: z.union([z.number().int(), z.boolean(), z.unknown()]).optional().describe("Model for Bool"),
    viewer: z.union([z.number().int(), z.boolean(), z.unknown()]).optional().describe("Model for Bool"),
  }).optional(),
})).describe("Model for Visibility Rule Request"),
})

export const BaseModelVisibilitySetOutput = z.object({
  msg: z.string().optional(),
})

export const baseModelVisibilitySet = pikkuSessionlessFunc({
  description: "Hide / show views based on user role",
  input: BaseModelVisibilitySetInput,
  output: BaseModelVisibilitySetOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v1/db/meta/projects/{baseId}/visibility-rules", data) as any
  },
})
