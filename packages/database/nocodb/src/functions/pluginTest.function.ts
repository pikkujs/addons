import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const PluginTestInput = z.object({
  "xc-auth": z.string().describe("Auth Token is a JWT Token generated based on the logged-in user. By default, the token is only valid for 10 hours. However, you can change the value by defining it using environment variable NC_JWT_EXPIRES_IN."),
  title: z.string().max(45).describe("Plugin Title"),
  input: z.union([z.string(), z.record(z.string(), z.unknown())]),
  category: z.string(),
})

export const PluginTestOutput = z.unknown()

export const pluginTest = pikkuSessionlessFunc({
  description: "Test if the plugin is working with the given configurations",
  input: PluginTestInput,
  output: PluginTestOutput,
  errors: [BadRequestError],
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v1/db/meta/plugins/test", data) as any
  },
})
