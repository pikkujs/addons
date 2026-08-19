import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AppsPermissionsRequestInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `none`"),
  scopes: z.string().describe("A comma separated list of scopes to request for"),
  trigger_id: z.string().describe("Token used to trigger the permissions API"),
})

export const AppsPermissionsRequestOutput = z.object({
  ok: z.literal(true),
}).describe("Schema for successful response from apps.permissions.request method")

export const appsPermissionsRequest = pikkuSessionlessFunc({
  description: "Allows an app to request additional scopes",
  input: AppsPermissionsRequestInput,
  output: AppsPermissionsRequestOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/apps.permissions.request", data) as any
  },
})
