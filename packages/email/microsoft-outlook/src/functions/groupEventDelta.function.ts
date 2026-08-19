import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const GroupEventDeltaInput = z.object({
  "group-id": z.string().describe("The unique identifier of group"),
  startDateTime: z.string().describe("The start date and time of the time range in the function, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00"),
  endDateTime: z.string().describe("The end date and time of the time range in the function, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00"),
  $top: z.number().int().min(0).optional().describe("Show only the first n items. Example: 50"),
  $skip: z.number().int().min(0).optional().describe("Skip the first n items"),
  $search: z.string().optional().describe("Search items by search phrases"),
  $filter: z.string().optional().describe("Filter items by property values"),
  $count: z.boolean().optional().describe("Include count of items"),
  $select: z.array(z.string()).optional().describe("Select properties to be returned"),
  $orderby: z.array(z.string()).optional().describe("Order items by property values"),
  $expand: z.array(z.string()).optional().describe("Expand related entities"),
})

export const GroupEventDeltaOutput = z.any()

export const groupEventDelta = pikkuSessionlessFunc({
  description: "Get a set of event resources that have been added, deleted, or updated in a calendarView (a range of events defined by start and end dates) of the user's primary calendar. Typically, synchronizing events in a calendarView in a local store entails a round of multiple delta function calls. The initial call is a full synchronization, and every subsequent delta call in the same round gets the incremental changes (additions, deletions, or updates). This allows you to maintain and synchronize a local store of events in the specified calendarView, without having to fetch all the events of that calendar from the server every time.",
  input: GroupEventDeltaInput,
  output: GroupEventDeltaOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/groups/{group-id}/events/microsoft.graph.delta()", data) as any
  },
})
