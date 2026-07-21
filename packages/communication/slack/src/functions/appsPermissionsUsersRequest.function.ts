import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AppsPermissionsUsersRequestInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `none`"),
  scopes: z.string().describe("A comma separated list of user scopes to request for"),
  trigger_id: z.string().describe("Token used to trigger the request"),
  user: z.string().describe("The user this scope is being requested for"),
})

export const AppsPermissionsUsersRequestOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const appsPermissionsUsersRequest = pikkuSessionlessFunc({
  description: "Enables an app to trigger a permissions modal to grant an app access to a user access scope.",
  input: AppsPermissionsUsersRequestInput,
  output: AppsPermissionsUsersRequestOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/apps.permissions.users.request", data) as any
  },
})
