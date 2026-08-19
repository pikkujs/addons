import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserCalendarListCalendarPermissionInput = z.object({
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

export const UserCalendarListCalendarPermissionOutput = z.object({
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

export const userCalendarListCalendarPermission = pikkuSessionlessFunc({
  description: "Get a collection of calendarPermission resources that describe the identity and roles of users with whom the specified calendar has been shared or delegated. Here, the calendar can be a user calendar or group calendar.",
  input: UserCalendarListCalendarPermissionInput,
  output: UserCalendarListCalendarPermissionOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("GET", "/users/{user-id}/calendar/calendarPermissions", data) as any
  },
})
