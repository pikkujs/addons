import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserEventListInstanceInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "event-id": z.string().describe("The unique identifier of event"),
  startDateTime: z.string().describe("The start date and time of the time range, represented in ISO 8601 format. For example, 2019-11-08T19:00:00-08:00"),
  endDateTime: z.string().describe("The end date and time of the time range, represented in ISO 8601 format. For example, 2019-11-08T20:00:00-08:00"),
  $top: z.number().int().min(0).optional().describe("Show only the first n items. Example: 50"),
  $skip: z.number().int().min(0).optional().describe("Skip the first n items"),
  $search: z.string().optional().describe("Search items by search phrases"),
  $filter: z.string().optional().describe("Filter items by property values"),
  $count: z.boolean().optional().describe("Include count of items"),
  $orderby: z.array(z.string()).optional().describe("Order items by property values"),
  $select: z.array(z.string()).optional().describe("Select properties to be returned"),
  $expand: z.array(z.string()).optional().describe("Expand related entities"),
})

export const UserEventListInstanceOutput = z.any()

export const userEventListInstance = pikkuSessionlessFunc({
  description: "The occurrences of a recurring series, if the event is a series master. This property includes occurrences that are part of the recurrence pattern, and exceptions modified, but doesn't include occurrences canceled from the series. Navigation property. Read-only. Nullable.",
  input: UserEventListInstanceInput,
  output: UserEventListInstanceOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/users/{user-id}/events/{event-id}/instances", data) as any
  },
})
