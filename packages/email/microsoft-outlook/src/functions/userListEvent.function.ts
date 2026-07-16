import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserListEventInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  $top: z.number().int().min(0).optional().describe("Show only the first n items. Example: 50"),
  $skip: z.number().int().min(0).optional().describe("Skip the first n items"),
  $search: z.string().optional().describe("Search items by search phrases"),
  $filter: z.string().optional().describe("Filter items by property values"),
  $count: z.boolean().optional().describe("Include count of items"),
  $orderby: z.array(z.string()).optional().describe("Order items by property values"),
  $select: z.array(z.string()).optional().describe("Select properties to be returned"),
  $expand: z.array(z.string()).optional().describe("Expand related entities"),
})

export const UserListEventOutput = z.any()

export const userListEvent = pikkuSessionlessFunc({
  description: "The user's events. Default is to show Events under the Default Calendar. Read-only. Nullable.",
  input: UserListEventInput,
  output: UserListEventOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/users/{user-id}/events", data) as any
  },
})
