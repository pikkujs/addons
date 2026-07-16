// Issue notification schemes — This resource represents notification schemes, lists of events and the recipients who will receive notifications for those events. Use it to get details of a notification scheme and a list of notification schemes. ### About notification schemes ### A notification scheme is a list of events and recipients who will receive notifications for those events. The list is contained within the `notificationSchemeEvents` object and contains pairs of `events` and `notifications`: * `event` Identifies the type of event. The events can be [Jira system events](https://confluence.atlassian.com/x/8YdKLg#Creatinganotificationscheme-eventsEvents) or [custom events](https://confluence.atlassian.com/x/AIlKLg). * `notifications` Identifies the [recipients](https://confluence.atlassian.com/x/8YdKLg#Creatinganotificationscheme-recipientsRecipients) of notifications for each event. Recipients can be any of the following types: * `CurrentAssignee` * `Reporter` * `CurrentUser` * `ProjectLead` * `ComponentLead` * `User` (the `parameter` is the user key) * `Group` (the `parameter` is the group name) * `ProjectRole` (the `parameter` is the project role ID) * `EmailAddress` * `AllWatchers` * `UserCustomField` (the `parameter` is the ID of the custom field) * `GroupCustomField`(the `parameter` is the ID of the custom field)

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const DeleteNotificationSchemeInput = z.object({
  notificationSchemeId: z.string().describe("The ID of the notification scheme."),
})

export const DeleteNotificationSchemeOutput = z.unknown()

export const deleteNotificationScheme = pikkuSessionlessFunc({
  description: "Deletes a notification scheme.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: DeleteNotificationSchemeInput,
  output: DeleteNotificationSchemeOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/notificationscheme/{notificationSchemeId}", data) as any
  },
})
