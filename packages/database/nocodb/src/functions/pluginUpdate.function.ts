import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const PluginUpdateInput = z.object({
  pluginId: z.string().describe("Plugin ID"),
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  active: z.union([z.number().int(), z.boolean(), z.unknown()]).optional().describe("Is Plugin Active?"),
  input: z.union([z.string(), z.unknown()]).optional().describe("Plugin Input"),
})

export const PluginUpdateOutput = z.unknown()

export const pluginUpdate = pikkuSessionlessFunc({
  description: "Update the plugin data by ID",
  input: PluginUpdateInput,
  output: PluginUpdateOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("PATCH", "/api/v1/db/meta/plugins/{pluginId}", data) as any
  },
})
