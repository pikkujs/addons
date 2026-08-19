import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserCalendarListCalendarViewInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
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

export const UserCalendarListCalendarViewOutput = z.any()

export const userCalendarListCalendarView = pikkuSessionlessFunc({
  description: "The calendar view for the calendar. Navigation property. Read-only.",
  input: UserCalendarListCalendarViewInput,
  output: UserCalendarListCalendarViewOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/users/{user-id}/calendar/calendarView", data) as any
  },
})
