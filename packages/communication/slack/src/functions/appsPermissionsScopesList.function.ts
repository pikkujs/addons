import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AppsPermissionsScopesListInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `none`"),
})

export const AppsPermissionsScopesListOutput = z.object({
  ok: z.literal(true),
  scopes: z.object({
    app_home: z.array(z.string()).optional(),
    channel: z.array(z.string()).optional(),
    group: z.array(z.string()).optional(),
    im: z.array(z.string()).optional(),
    mpim: z.array(z.string()).optional(),
    team: z.array(z.string()).optional(),
    user: z.array(z.string()).optional(),
  }),
}).describe("Schema for successful response api.permissions.scopes.list method")

export const appsPermissionsScopesList = pikkuSessionlessFunc({
  description: "Returns list of scopes this app has on a team.",
  input: AppsPermissionsScopesListInput,
  output: AppsPermissionsScopesListOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/apps.permissions.scopes.list", data) as any
  },
})
