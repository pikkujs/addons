import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SettingsGetInput = z.object({
  setting: z.string().describe("The id of the user setting."),
  alt: z.literal("json").optional().describe("Data format for the response."),
  fields: z.string().optional().describe("Selector specifying which fields to include in a partial response."),
  key: z.string().optional().describe("API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token."),
  oauth_token: z.string().optional().describe("OAuth 2.0 token for the current user."),
  prettyPrint: z.boolean().optional().describe("Returns response with indentations and line breaks."),
  quotaUser: z.string().optional().describe("An opaque string that represents a user for quota purposes. Must not exceed 40 characters."),
  userIp: z.string().optional().describe("Deprecated. Please use quotaUser instead."),
})

export const SettingsGetOutput = z.object({
  etag: z.string().optional().describe("ETag of the resource."),
  id: z.string().optional().describe("The id of the user setting."),
  kind: z.string().optional().default("calendar#setting").describe("Type of the resource (\"calendar#setting\")."),
  value: z.string().optional().describe("Value of the user setting. The format of the value depends on the ID of the setting. It must always be a UTF-8 string of length up to 1024 characters."),
})

export const settingsGet = pikkuSessionlessFunc({
  description: "Returns a single user setting.",
  input: SettingsGetInput,
  output: SettingsGetOutput,
  func: async ({ googleCalendar }, data) => {
    return googleCalendar.call("GET", "/users/me/settings/{setting}", data) as any
  },
})
