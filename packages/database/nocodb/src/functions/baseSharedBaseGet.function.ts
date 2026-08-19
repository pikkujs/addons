import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const BaseSharedBaseGetInput = z.object({
  baseId: z.string().min(0).max(20).describe("Model for ID").describe("Unique Base ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
})

export const BaseSharedBaseGetOutput = z.object({
  uuid: z.string().uuid().optional(),
  url: z.string().url().optional(),
  roles: z.string().optional(),
  fk_custom_url_id: z.union([z.string(), z.unknown()]).optional().describe("ID of custom url"),
})

export const baseSharedBaseGet = pikkuSessionlessFunc({
  description: "Get Base Shared Base",
  input: BaseSharedBaseGetInput,
  output: BaseSharedBaseGetOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/db/meta/projects/{baseId}/shared", data) as any
  },
})
