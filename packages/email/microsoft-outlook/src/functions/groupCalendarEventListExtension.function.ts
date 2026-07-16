import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GroupCalendarEventListExtensionInput = z.object({
  "group-id": z.string().describe("The unique identifier of group"),
  "event-id": z.string().describe("The unique identifier of event"),
  $top: z.number().int().min(0).optional().describe("Show only the first n items. Example: 50"),
  $skip: z.number().int().min(0).optional().describe("Skip the first n items"),
  $search: z.string().optional().describe("Search items by search phrases"),
  $filter: z.string().optional().describe("Filter items by property values"),
  $count: z.boolean().optional().describe("Include count of items"),
  $orderby: z.array(z.string()).optional().describe("Order items by property values"),
  $select: z.array(z.string()).optional().describe("Select properties to be returned"),
  $expand: z.array(z.string()).optional().describe("Expand related entities"),
})

export const GroupCalendarEventListExtensionOutput = z.object({
  value: z.array(z.object({
    id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
  })).optional(),
  "@odata.nextLink": z.string().nullable().optional(),
})

export const groupCalendarEventListExtension = pikkuSessionlessFunc({
  description: "The collection of open extensions defined for the event. Nullable.",
  input: GroupCalendarEventListExtensionInput,
  output: GroupCalendarEventListExtensionOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/groups/{group-id}/calendar/events/{event-id}/extensions", data) as any
  },
})
