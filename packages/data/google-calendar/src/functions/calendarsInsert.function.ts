import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CalendarsInsertInput = z.object({
  alt: z.literal("json").optional().describe("Data format for the response."),
  fields: z.string().optional().describe("Selector specifying which fields to include in a partial response."),
  key: z.string().optional().describe("API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token."),
  oauth_token: z.string().optional().describe("OAuth 2.0 token for the current user."),
  prettyPrint: z.boolean().optional().describe("Returns response with indentations and line breaks."),
  quotaUser: z.string().optional().describe("An opaque string that represents a user for quota purposes. Must not exceed 40 characters."),
  userIp: z.string().optional().describe("Deprecated. Please use quotaUser instead."),
  conferenceProperties: z.object({
  allowedConferenceSolutionTypes: z.array(z.string()).optional().describe("The types of conference solutions that are supported for this calendar.\nThe possible values are:  \n- \"eventHangout\" \n- \"eventNamedHangout\" \n- \"hangoutsMeet\"  Optional."),
}).optional().describe("Conferencing properties for this calendar, for example what types of conferences are allowed."),
  description: z.string().optional().describe("Description of the calendar. Optional."),
  etag: z.string().optional().describe("ETag of the resource."),
  id: z.string().optional().describe("Identifier of the calendar. To retrieve IDs call the calendarList.list() method."),
  kind: z.string().optional().default("calendar#calendar").describe("Type of the resource (\"calendar#calendar\")."),
  location: z.string().optional().describe("Geographic location of the calendar as free-form text. Optional."),
  summary: z.string().optional().describe("Title of the calendar."),
  timeZone: z.string().optional().describe("The time zone of the calendar. (Formatted as an IANA Time Zone Database name, e.g. \"Europe/Zurich\".) Optional."),
})

export const CalendarsInsertOutput = z.object({
  conferenceProperties: z.object({
    allowedConferenceSolutionTypes: z.array(z.string()).optional().describe("The types of conference solutions that are supported for this calendar.\nThe possible values are:  \n- \"eventHangout\" \n- \"eventNamedHangout\" \n- \"hangoutsMeet\"  Optional."),
  }).optional().describe("Conferencing properties for this calendar, for example what types of conferences are allowed."),
  description: z.string().optional().describe("Description of the calendar. Optional."),
  etag: z.string().optional().describe("ETag of the resource."),
  id: z.string().optional().describe("Identifier of the calendar. To retrieve IDs call the calendarList.list() method."),
  kind: z.string().optional().default("calendar#calendar").describe("Type of the resource (\"calendar#calendar\")."),
  location: z.string().optional().describe("Geographic location of the calendar as free-form text. Optional."),
  summary: z.string().optional().describe("Title of the calendar."),
  timeZone: z.string().optional().describe("The time zone of the calendar. (Formatted as an IANA Time Zone Database name, e.g. \"Europe/Zurich\".) Optional."),
})

export const calendarsInsert = pikkuSessionlessFunc({
  description: "Creates a secondary calendar.",
  input: CalendarsInsertInput,
  output: CalendarsInsertOutput,
  func: async ({ googleCalendar }, data) => {
    return googleCalendar.call("POST", "/calendars", data) as any
  },
})
