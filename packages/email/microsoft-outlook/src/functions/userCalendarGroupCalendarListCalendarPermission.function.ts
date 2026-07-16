import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserCalendarGroupCalendarListCalendarPermissionInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "calendarGroup-id": z.string().describe("The unique identifier of calendarGroup"),
  "calendar-id": z.string().describe("The unique identifier of calendar"),
  $top: z.number().int().min(0).optional().describe("Show only the first n items. Example: 50"),
  $skip: z.number().int().min(0).optional().describe("Skip the first n items"),
  $search: z.string().optional().describe("Search items by search phrases"),
  $filter: z.string().optional().describe("Filter items by property values"),
  $count: z.boolean().optional().describe("Include count of items"),
  $orderby: z.array(z.string()).optional().describe("Order items by property values"),
  $select: z.array(z.string()).optional().describe("Select properties to be returned"),
  $expand: z.array(z.string()).optional().describe("Expand related entities"),
})

export const UserCalendarGroupCalendarListCalendarPermissionOutput = z.object({
  value: z.array(z.object({
    id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
    allowedRoles: z.array(z.enum(["none", "freeBusyRead", "limitedRead", "read", "write", "delegateWithoutPrivateEventAccess", "delegateWithPrivateEventAccess", "custom"])).optional().describe("List of allowed sharing or delegating permission levels for the calendar. The possible values are: none, freeBusyRead, limitedRead, read, write, delegateWithoutPrivateEventAccess, delegateWithPrivateEventAccess, custom."),
    emailAddress: z.object({
      address: z.string().nullable().optional().describe("The email address of the person or entity."),
      name: z.string().nullable().optional().describe("The display name of the person or entity."),
    }).optional(),
    isInsideOrganization: z.boolean().nullable().optional().describe("True if the user in context (recipient or delegate) is inside the same organization as the calendar owner."),
    isRemovable: z.boolean().nullable().optional().describe("True if the user can be removed from the list of recipients or delegates for the specified calendar, false otherwise. The 'My organization' user determines the permissions other people within your organization have to the given calendar. You can't remove 'My organization' as a share recipient to a calendar."),
    role: z.enum(["none", "freeBusyRead", "limitedRead", "read", "write", "delegateWithoutPrivateEventAccess", "delegateWithPrivateEventAccess", "custom"]).optional(),
  })).optional(),
  "@odata.nextLink": z.string().nullable().optional(),
})

export const userCalendarGroupCalendarListCalendarPermission = pikkuSessionlessFunc({
  description: "The permissions of the users with whom the calendar is shared.",
  input: UserCalendarGroupCalendarListCalendarPermissionInput,
  output: UserCalendarGroupCalendarListCalendarPermissionOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/calendarPermissions", data) as any
  },
})
