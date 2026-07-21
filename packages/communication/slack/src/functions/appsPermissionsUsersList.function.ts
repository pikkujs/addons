import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AppsPermissionsUsersListInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `none`"),
  cursor: z.string().optional().describe("Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request's `response_metadata`. Default value fetches the first \"page\" of the collection. See [pagination](/docs/pagination) for more detail."),
  limit: z.number().int().optional().describe("The maximum number of items to return."),
})

export const AppsPermissionsUsersListOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const appsPermissionsUsersList = pikkuSessionlessFunc({
  description: "Returns list of user grants and corresponding scopes this app has on a team.",
  input: AppsPermissionsUsersListInput,
  output: AppsPermissionsUsersListOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/apps.permissions.users.list", data) as any
  },
})
