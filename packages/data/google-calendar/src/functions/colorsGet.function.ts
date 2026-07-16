import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ColorsGetInput = z.object({
  alt: z.literal("json").optional().describe("Data format for the response."),
  fields: z.string().optional().describe("Selector specifying which fields to include in a partial response."),
  key: z.string().optional().describe("API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token."),
  oauth_token: z.string().optional().describe("OAuth 2.0 token for the current user."),
  prettyPrint: z.boolean().optional().describe("Returns response with indentations and line breaks."),
  quotaUser: z.string().optional().describe("An opaque string that represents a user for quota purposes. Must not exceed 40 characters."),
  userIp: z.string().optional().describe("Deprecated. Please use quotaUser instead."),
})

export const ColorsGetOutput = z.object({
  calendar: z.record(z.string(), z.object({
    background: z.string().optional().describe("The background color associated with this color definition."),
    foreground: z.string().optional().describe("The foreground color that can be used to write on top of a background with 'background' color."),
  }).describe("A calendar color definition.")).optional().describe("A global palette of calendar colors, mapping from the color ID to its definition. A calendarListEntry resource refers to one of these color IDs in its colorId field. Read-only."),
  event: z.record(z.string(), z.object({
    background: z.string().optional().describe("The background color associated with this color definition."),
    foreground: z.string().optional().describe("The foreground color that can be used to write on top of a background with 'background' color."),
  }).describe("An event color definition.")).optional().describe("A global palette of event colors, mapping from the color ID to its definition. An event resource may refer to one of these color IDs in its colorId field. Read-only."),
  kind: z.string().optional().default("calendar#colors").describe("Type of the resource (\"calendar#colors\")."),
  updated: z.string().datetime().optional().describe("Last modification time of the color palette (as a RFC3339 timestamp). Read-only."),
})

export const colorsGet = pikkuSessionlessFunc({
  description: "Returns the color definitions for calendars and events.",
  input: ColorsGetInput,
  output: ColorsGetOutput,
  func: async ({ googleCalendar }, data) => {
    return googleCalendar.call("GET", "/colors", data) as any
  },
})
