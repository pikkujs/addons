import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const EventsDeleteInput = z.object({
  calendarId: z.string().describe("Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the \"primary\" keyword."),
  eventId: z.string().describe("Event identifier."),
  alt: z.literal("json").optional().describe("Data format for the response."),
  fields: z.string().optional().describe("Selector specifying which fields to include in a partial response."),
  key: z.string().optional().describe("API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token."),
  oauth_token: z.string().optional().describe("OAuth 2.0 token for the current user."),
  prettyPrint: z.boolean().optional().describe("Returns response with indentations and line breaks."),
  quotaUser: z.string().optional().describe("An opaque string that represents a user for quota purposes. Must not exceed 40 characters."),
  userIp: z.string().optional().describe("Deprecated. Please use quotaUser instead."),
  sendNotifications: z.boolean().optional().describe("Deprecated. Please use sendUpdates instead.\n\nWhether to send notifications about the deletion of the event. Note that some emails might still be sent even if you set the value to false. The default is false."),
  sendUpdates: z.enum(["all", "externalOnly", "none"]).optional().describe("Guests who should receive notifications about the deletion of the event."),
})

export const eventsDelete = pikkuSessionlessFunc({
  description: "Deletes an event.",
  input: EventsDeleteInput,
  func: async ({ googleCalendar }, data) => {
    return googleCalendar.call("DELETE", "/calendars/{calendarId}/events/{eventId}", data)
  },
})
