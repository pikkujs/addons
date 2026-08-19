import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const SettingsListInput = z.object({
  alt: z.literal("json").optional().describe("Data format for the response."),
  fields: z.string().optional().describe("Selector specifying which fields to include in a partial response."),
  key: z.string().optional().describe("API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token."),
  oauth_token: z.string().optional().describe("OAuth 2.0 token for the current user."),
  prettyPrint: z.boolean().optional().describe("Returns response with indentations and line breaks."),
  quotaUser: z.string().optional().describe("An opaque string that represents a user for quota purposes. Must not exceed 40 characters."),
  userIp: z.string().optional().describe("Deprecated. Please use quotaUser instead."),
  maxResults: z.number().int().min(1).optional().describe("Maximum number of entries returned on one result page. By default the value is 100 entries. The page size can never be larger than 250 entries. Optional."),
  pageToken: z.string().optional().describe("Token specifying which result page to return. Optional."),
  syncToken: z.string().optional().describe("Token obtained from the nextSyncToken field returned on the last page of results from the previous list request. It makes the result of this list request contain only entries that have changed since then.\nIf the syncToken expires, the server will respond with a 410 GONE response code and the client should clear its storage and perform a full synchronization without any syncToken.\nLearn more about incremental synchronization.\nOptional. The default is to return all entries."),
})

export const SettingsListOutput = z.object({
  etag: z.string().optional().describe("Etag of the collection."),
  items: z.array(z.object({
    etag: z.string().optional().describe("ETag of the resource."),
    id: z.string().optional().describe("The id of the user setting."),
    kind: z.string().optional().default("calendar#setting").describe("Type of the resource (\"calendar#setting\")."),
    value: z.string().optional().describe("Value of the user setting. The format of the value depends on the ID of the setting. It must always be a UTF-8 string of length up to 1024 characters."),
  })).optional().describe("List of user settings."),
  kind: z.string().optional().default("calendar#settings").describe("Type of the collection (\"calendar#settings\")."),
  nextPageToken: z.string().optional().describe("Token used to access the next page of this result. Omitted if no further results are available, in which case nextSyncToken is provided."),
  nextSyncToken: z.string().optional().describe("Token used at a later point in time to retrieve only the entries that have changed since this result was returned. Omitted if further results are available, in which case nextPageToken is provided."),
})

export const settingsList = pikkuSessionlessFunc({
  description: "Returns all user settings for the authenticated user.",
  input: SettingsListInput,
  output: SettingsListOutput,
  func: async ({ googleCalendar }, data) => {
    return googleCalendar.call("GET", "/users/me/settings", data) as any
  },
})
