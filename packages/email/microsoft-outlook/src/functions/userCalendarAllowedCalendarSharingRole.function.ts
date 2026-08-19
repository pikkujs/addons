import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserCalendarAllowedCalendarSharingRoleInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  User: z.string().describe("Usage: User='{User}'"),
  $top: z.number().int().min(0).optional().describe("Show only the first n items. Example: 50"),
  $skip: z.number().int().min(0).optional().describe("Skip the first n items"),
  $search: z.string().optional().describe("Search items by search phrases"),
  $filter: z.string().optional().describe("Filter items by property values"),
  $count: z.boolean().optional().describe("Include count of items"),
})

export const UserCalendarAllowedCalendarSharingRoleOutput = z.object({
  value: z.array(z.enum(["none", "freeBusyRead", "limitedRead", "read", "write", "delegateWithoutPrivateEventAccess", "delegateWithPrivateEventAccess", "custom"])).optional(),
  "@odata.nextLink": z.string().nullable().optional(),
})

export const userCalendarAllowedCalendarSharingRole = pikkuSessionlessFunc({
  input: UserCalendarAllowedCalendarSharingRoleInput,
  output: UserCalendarAllowedCalendarSharingRoleOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/users/{user-id}/calendar/microsoft.graph.allowedCalendarSharingRoles(User='{User}')", data) as any
  },
})
