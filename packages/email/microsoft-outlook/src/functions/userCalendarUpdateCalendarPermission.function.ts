import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserCalendarUpdateCalendarPermissionInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "calendarPermission-id": z.string().describe("The unique identifier of calendarPermission"),
  body: z.object({
  id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
  allowedRoles: z.array(z.enum(["none", "freeBusyRead", "limitedRead", "read", "write", "delegateWithoutPrivateEventAccess", "delegateWithPrivateEventAccess", "custom"])).optional().describe("List of allowed sharing or delegating permission levels for the calendar. The possible values are: none, freeBusyRead, limitedRead, read, write, delegateWithoutPrivateEventAccess, delegateWithPrivateEventAccess, custom."),
  emailAddress: z.object({
    address: z.string().nullable().optional().describe("The email address of the person or entity."),
    name: z.string().nullable().optional().describe("The display name of the person or entity."),
  }).optional(),
  isInsideOrganization: z.boolean().nullable().optional().describe("True if the user in context (recipient or delegate) is inside the same organization as the calendar owner."),
  isRemovable: z.boolean().nullable().optional().describe("True if the user can be removed from the list of recipients or delegates for the specified calendar, false otherwise. The 'My organization' user determines the permissions other people within your organization have to the given calendar. You can't remove 'My organization' as a share recipient to a calendar."),
  role: z.enum(["none", "freeBusyRead", "limitedRead", "read", "write", "delegateWithoutPrivateEventAccess", "delegateWithPrivateEventAccess", "custom"]).optional(),
}),
})

export const UserCalendarUpdateCalendarPermissionOutput = z.object({
  id: z.string().optional().describe("The unique identifier for an entity. Read-only."),
  allowedRoles: z.array(z.enum(["none", "freeBusyRead", "limitedRead", "read", "write", "delegateWithoutPrivateEventAccess", "delegateWithPrivateEventAccess", "custom"])).optional().describe("List of allowed sharing or delegating permission levels for the calendar. The possible values are: none, freeBusyRead, limitedRead, read, write, delegateWithoutPrivateEventAccess, delegateWithPrivateEventAccess, custom."),
  emailAddress: z.object({
    address: z.string().nullable().optional().describe("The email address of the person or entity."),
    name: z.string().nullable().optional().describe("The display name of the person or entity."),
  }).optional(),
  isInsideOrganization: z.boolean().nullable().optional().describe("True if the user in context (recipient or delegate) is inside the same organization as the calendar owner."),
  isRemovable: z.boolean().nullable().optional().describe("True if the user can be removed from the list of recipients or delegates for the specified calendar, false otherwise. The 'My organization' user determines the permissions other people within your organization have to the given calendar. You can't remove 'My organization' as a share recipient to a calendar."),
  role: z.enum(["none", "freeBusyRead", "limitedRead", "read", "write", "delegateWithoutPrivateEventAccess", "delegateWithPrivateEventAccess", "custom"]).optional(),
})

export const userCalendarUpdateCalendarPermission = pikkuSessionlessFunc({
  description: "Update the permissions assigned to an existing share recipient or delegate, through the corresponding <b>calendarPermission</b> object for a calendar.",
  input: UserCalendarUpdateCalendarPermissionInput,
  output: UserCalendarUpdateCalendarPermissionOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("PATCH", "/users/{user-id}/calendar/calendarPermissions/{calendarPermission-id}", data) as any
  },
})
