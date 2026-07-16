import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserEventCancelInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "event-id": z.string().describe("The unique identifier of event"),
  Comment: z.string().nullable().optional(),
})

export const userEventCancel = pikkuSessionlessFunc({
  description: "This action allows the organizer of a meeting to send a cancellation message and cancel the event.  The action moves the event to the Deleted Items folder. The organizer can also cancel an occurrence of a recurring meeting \r\nby providing the occurrence event ID. An attendee calling this action gets an error (HTTP 400 Bad Request), with the following\r\nerror message: 'Your request can't be completed. You need to be an organizer to cancel a meeting.' This action differs from Delete in that Cancel is available to only the organizer, and lets\r\nthe organizer send a custom message to the attendees about the cancellation.",
  input: UserEventCancelInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/users/{user-id}/events/{event-id}/microsoft.graph.cancel", data)
  },
})
