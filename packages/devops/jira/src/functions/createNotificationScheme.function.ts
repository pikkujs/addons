// Issue notification schemes — This resource represents notification schemes, lists of events and the recipients who will receive notifications for those events. Use it to get details of a notification scheme and a list of notification schemes. ### About notification schemes ### A notification scheme is a list of events and recipients who will receive notifications for those events. The list is contained within the `notificationSchemeEvents` object and contains pairs of `events` and `notifications`: * `event` Identifies the type of event. The events can be [Jira system events](https://confluence.atlassian.com/x/8YdKLg#Creatinganotificationscheme-eventsEvents) or [custom events](https://confluence.atlassian.com/x/AIlKLg). * `notifications` Identifies the [recipients](https://confluence.atlassian.com/x/8YdKLg#Creatinganotificationscheme-recipientsRecipients) of notifications for each event. Recipients can be any of the following types: * `CurrentAssignee` * `Reporter` * `CurrentUser` * `ProjectLead` * `ComponentLead` * `User` (the `parameter` is the user key) * `Group` (the `parameter` is the group name) * `ProjectRole` (the `parameter` is the project role ID) * `EmailAddress` * `AllWatchers` * `UserCustomField` (the `parameter` is the ID of the custom field) * `GroupCustomField`(the `parameter` is the ID of the custom field)

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const CreateNotificationSchemeInput = z.object({
  description: z.string().max(4000).optional().describe("The description of the notification scheme."),
  name: z.string().max(255).describe("The name of the notification scheme. Must be unique (case-insensitive)."),
  notificationSchemeEvents: z.array(z.object({
  event: z.object({
    id: z.string().describe("The ID of the notification scheme event."),
  }).describe("The ID of the event."),
  notifications: z.array(z.object({
    notificationType: z.string().describe("The notification type, e.g `CurrentAssignee`, `Group`, `EmailAddress`."),
    parameter: z.string().optional().describe("The value corresponding to the specified notification type."),
  })).describe("The list of notifications mapped to a specified event."),
})).optional().describe("The list of notifications which should be added to the notification scheme."),
})

export const CreateNotificationSchemeOutput = z.object({
  id: z.string().describe("The ID of a notification scheme."),
}).describe("The ID of a notification scheme.")

export const createNotificationScheme = pikkuSessionlessFunc({
  description: "Creates a notification scheme with notifications. You can create up to 1000 notifications per request.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: CreateNotificationSchemeInput,
  output: CreateNotificationSchemeOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/notificationscheme", data) as any
  },
})
