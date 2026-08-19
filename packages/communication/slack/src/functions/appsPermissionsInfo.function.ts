import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AppsPermissionsInfoInput = z.object({
  token: z.string().optional().describe("Authentication token. Requires scope: `none`"),
})

export const AppsPermissionsInfoOutput = z.object({
  info: z.object({
    app_home: z.object({
      resources: z.object({
        excluded_ids: z.array(z.unknown()).optional(),
        ids: z.array(z.unknown()),
        wildcard: z.boolean().optional(),
      }).optional(),
      scopes: z.array(z.string()).optional(),
    }),
    channel: z.object({
      resources: z.object({
        excluded_ids: z.array(z.unknown()).optional(),
        ids: z.array(z.unknown()),
        wildcard: z.boolean().optional(),
      }).optional(),
      scopes: z.array(z.string()).optional(),
    }),
    group: z.object({
      resources: z.object({
        excluded_ids: z.array(z.unknown()).optional(),
        ids: z.array(z.unknown()),
        wildcard: z.boolean().optional(),
      }).optional(),
      scopes: z.array(z.string()).optional(),
    }),
    im: z.object({
      resources: z.object({
        excluded_ids: z.array(z.unknown()).optional(),
        ids: z.array(z.unknown()),
        wildcard: z.boolean().optional(),
      }).optional(),
      scopes: z.array(z.string()).optional(),
    }),
    mpim: z.object({
      resources: z.object({
        excluded_ids: z.array(z.unknown()).optional(),
        ids: z.array(z.unknown()),
        wildcard: z.boolean().optional(),
      }).optional(),
      scopes: z.array(z.string()).optional(),
    }),
    team: z.object({
      resources: z.object({
        excluded_ids: z.array(z.unknown()).optional(),
        ids: z.array(z.unknown()),
        wildcard: z.boolean().optional(),
      }),
      scopes: z.array(z.string()),
    }),
  }),
  ok: z.literal(true),
}).describe("Schema for successful response from apps.permissions.info method")

export const appsPermissionsInfo = pikkuSessionlessFunc({
  description: "Returns list of permissions this app has on a team.",
  input: AppsPermissionsInfoInput,
  output: AppsPermissionsInfoOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/apps.permissions.info", data) as any
  },
})
