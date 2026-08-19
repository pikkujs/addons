import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const FreebusyQueryInput = z.object({
  alt: z.literal("json").optional().describe("Data format for the response."),
  fields: z.string().optional().describe("Selector specifying which fields to include in a partial response."),
  key: z.string().optional().describe("API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token."),
  oauth_token: z.string().optional().describe("OAuth 2.0 token for the current user."),
  prettyPrint: z.boolean().optional().describe("Returns response with indentations and line breaks."),
  quotaUser: z.string().optional().describe("An opaque string that represents a user for quota purposes. Must not exceed 40 characters."),
  userIp: z.string().optional().describe("Deprecated. Please use quotaUser instead."),
  calendarExpansionMax: z.number().int().optional().describe("Maximal number of calendars for which FreeBusy information is to be provided. Optional. Maximum value is 50."),
  groupExpansionMax: z.number().int().optional().describe("Maximal number of calendar identifiers to be provided for a single group. Optional. An error is returned for a group with more members than this value. Maximum value is 100."),
  items: z.array(z.object({
  id: z.string().optional().describe("The identifier of a calendar or a group."),
})).optional().describe("List of calendars and/or groups to query."),
  timeMax: z.string().datetime().optional().describe("The end of the interval for the query formatted as per RFC3339."),
  timeMin: z.string().datetime().optional().describe("The start of the interval for the query formatted as per RFC3339."),
  timeZone: z.string().optional().default("UTC").describe("Time zone used in the response. Optional. The default is UTC."),
})

export const FreebusyQueryOutput = z.object({
  calendars: z.record(z.string(), z.object({
    busy: z.array(z.object({
      end: z.string().datetime().optional().describe("The (exclusive) end of the time period."),
      start: z.string().datetime().optional().describe("The (inclusive) start of the time period."),
    })).optional().describe("List of time ranges during which this calendar should be regarded as busy."),
    errors: z.array(z.object({
      domain: z.string().optional().describe("Domain, or broad category, of the error."),
      reason: z.string().optional().describe("Specific reason for the error. Some of the possible values are:  \n- \"groupTooBig\" - The group of users requested is too large for a single query. \n- \"tooManyCalendarsRequested\" - The number of calendars requested is too large for a single query. \n- \"notFound\" - The requested resource was not found. \n- \"internalError\" - The API service has encountered an internal error.  Additional error types may be added in the future, so clients should gracefully handle additional error statuses not included in this list."),
    })).optional().describe("Optional error(s) (if computation for the calendar failed)."),
  }).describe("Free/busy expansions for a single calendar.")).optional().describe("List of free/busy information for calendars."),
  groups: z.record(z.string(), z.object({
    calendars: z.array(z.string()).optional().describe("List of calendars' identifiers within a group."),
    errors: z.array(z.object({
      domain: z.string().optional().describe("Domain, or broad category, of the error."),
      reason: z.string().optional().describe("Specific reason for the error. Some of the possible values are:  \n- \"groupTooBig\" - The group of users requested is too large for a single query. \n- \"tooManyCalendarsRequested\" - The number of calendars requested is too large for a single query. \n- \"notFound\" - The requested resource was not found. \n- \"internalError\" - The API service has encountered an internal error.  Additional error types may be added in the future, so clients should gracefully handle additional error statuses not included in this list."),
    })).optional().describe("Optional error(s) (if computation for the group failed)."),
  }).describe("List of calendars that are members of this group.")).optional().describe("Expansion of groups."),
  kind: z.string().optional().default("calendar#freeBusy").describe("Type of the resource (\"calendar#freeBusy\")."),
  timeMax: z.string().datetime().optional().describe("The end of the interval."),
  timeMin: z.string().datetime().optional().describe("The start of the interval."),
})

export const freebusyQuery = pikkuSessionlessFunc({
  description: "Returns free/busy information for a set of calendars.",
  input: FreebusyQueryInput,
  output: FreebusyQueryOutput,
  func: async ({ googleCalendar }, data) => {
    return googleCalendar.call("POST", "/freeBusy", data) as any
  },
})
