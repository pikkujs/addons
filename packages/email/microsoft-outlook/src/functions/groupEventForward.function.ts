import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const GroupEventForwardInput = z.object({
  "group-id": z.string().describe("The unique identifier of group"),
  "event-id": z.string().describe("The unique identifier of event"),
  ToRecipients: z.array(z.object({
  emailAddress: z.object({
    address: z.string().nullable().optional().describe("The email address of the person or entity."),
    name: z.string().nullable().optional().describe("The display name of the person or entity."),
  }).optional(),
})).optional(),
  Comment: z.string().nullable().optional(),
})

export const groupEventForward = pikkuSessionlessFunc({
  description: "This action allows the organizer or attendee of a meeting event to forward the\r\nmeeting request to a new recipient. If the meeting event is forwarded from an attendee's Microsoft 365 mailbox to another recipient, this action\r\nalso sends a message to notify the organizer of the forwarding, and adds the recipient to the organizer's\r\ncopy of the meeting event. This convenience is not available when forwarding from an Outlook.com account.",
  input: GroupEventForwardInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/groups/{group-id}/events/{event-id}/microsoft.graph.forward", data)
  },
})
