import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserCalendarGroupCalendarEventTentativelyAcceptInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "calendarGroup-id": z.string().describe("The unique identifier of calendarGroup"),
  "calendar-id": z.string().describe("The unique identifier of calendar"),
  "event-id": z.string().describe("The unique identifier of event"),
  ProposedNewTime: z.object({
  end: z.object({
    dateTime: z.string().optional().describe("A single point of time in a combined date and time representation ({date}T{time}; for example, 2017-08-29T04:00:00.0000000)."),
    timeZone: z.string().nullable().optional().describe("Represents a time zone, for example, 'Pacific Standard Time'. See below for more possible values."),
  }).optional(),
  start: z.object({
    dateTime: z.string().optional().describe("A single point of time in a combined date and time representation ({date}T{time}; for example, 2017-08-29T04:00:00.0000000)."),
    timeZone: z.string().nullable().optional().describe("Represents a time zone, for example, 'Pacific Standard Time'. See below for more possible values."),
  }).optional(),
}).optional(),
  SendResponse: z.boolean().nullable().optional().default(false),
  Comment: z.string().nullable().optional(),
})

export const userCalendarGroupCalendarEventTentativelyAccept = pikkuSessionlessFunc({
  description: "Tentatively accept the specified event in a user calendar. If the event allows proposals for new times, on responding tentative to the event, an invitee can choose to suggest an alternative time by including the proposedNewTime parameter. For more information on how to propose a time, and how to receive and accept a new time proposal, see Propose new meeting times.",
  input: UserCalendarGroupCalendarEventTentativelyAcceptInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/users/{user-id}/calendarGroups/{calendarGroup-id}/calendars/{calendar-id}/events/{event-id}/microsoft.graph.tentativelyAccept", data)
  },
})
