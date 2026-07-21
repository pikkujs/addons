import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AppsPermissionsResourcesListInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `none`"),
  cursor: z.string().optional().describe("Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request's `response_metadata`. Default value fetches the first \"page\" of the collection. See [pagination](/docs/pagination) for more detail."),
  limit: z.number().int().optional().describe("The maximum number of items to return."),
})

export const AppsPermissionsResourcesListOutput = z.object({
  ok: z.literal(true),
  resources: z.array(z.object({
    id: z.string().optional(),
    type: z.string().optional(),
  })),
  response_metadata: z.object({
    next_cursor: z.string(),
  }).optional(),
}).describe("Schema for successful response apps.permissions.resources.list method")

export const appsPermissionsResourcesList = pikkuSessionlessFunc({
  description: "Returns list of resource grants this app has on a team.",
  input: AppsPermissionsResourcesListInput,
  output: AppsPermissionsResourcesListOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/apps.permissions.resources.list", data) as any
  },
})
