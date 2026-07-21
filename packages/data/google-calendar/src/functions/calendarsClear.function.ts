import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CalendarsClearInput = z.object({
  calendarId: z.string().describe("Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the \"primary\" keyword."),
  alt: z.literal("json").optional().describe("Data format for the response."),
  fields: z.string().optional().describe("Selector specifying which fields to include in a partial response."),
  key: z.string().optional().describe("API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token."),
  oauth_token: z.string().optional().describe("OAuth 2.0 token for the current user."),
  prettyPrint: z.boolean().optional().describe("Returns response with indentations and line breaks."),
  quotaUser: z.string().optional().describe("An opaque string that represents a user for quota purposes. Must not exceed 40 characters."),
  userIp: z.string().optional().describe("Deprecated. Please use quotaUser instead."),
})

export const calendarsClear = pikkuSessionlessFunc({
  description: "Clears a primary calendar. This operation deletes all events associated with the primary calendar of an account.",
  input: CalendarsClearInput,
  func: async ({ googleCalendar }, data) => {
    return googleCalendar.call("POST", "/calendars/{calendarId}/clear", data)
  },
})
