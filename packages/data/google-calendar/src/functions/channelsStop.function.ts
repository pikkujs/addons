import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ChannelsStopInput = z.object({
  alt: z.literal("json").optional().describe("Data format for the response."),
  fields: z.string().optional().describe("Selector specifying which fields to include in a partial response."),
  key: z.string().optional().describe("API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token."),
  oauth_token: z.string().optional().describe("OAuth 2.0 token for the current user."),
  prettyPrint: z.boolean().optional().describe("Returns response with indentations and line breaks."),
  quotaUser: z.string().optional().describe("An opaque string that represents a user for quota purposes. Must not exceed 40 characters."),
  userIp: z.string().optional().describe("Deprecated. Please use quotaUser instead."),
  address: z.string().optional().describe("The address where notifications are delivered for this channel."),
  expiration: z.string().optional().describe("Date and time of notification channel expiration, expressed as a Unix timestamp, in milliseconds. Optional."),
  id: z.string().optional().describe("A UUID or similar unique string that identifies this channel."),
  kind: z.string().optional().default("api#channel").describe("Identifies this as a notification channel used to watch for changes to a resource, which is \"api#channel\"."),
  params: z.record(z.string(), z.string().describe("Declares a new parameter by name.")).optional().describe("Additional parameters controlling delivery channel behavior. Optional."),
  payload: z.boolean().optional().describe("A Boolean value to indicate whether payload is wanted. Optional."),
  resourceId: z.string().optional().describe("An opaque ID that identifies the resource being watched on this channel. Stable across different API versions."),
  resourceUri: z.string().optional().describe("A version-specific identifier for the watched resource."),
  token: z.string().optional().describe("An arbitrary string delivered to the target address with each notification delivered over this channel. Optional."),
  type: z.string().optional().describe("The type of delivery mechanism used for this channel. Valid values are \"web_hook\" (or \"webhook\"). Both values refer to a channel where Http requests are used to deliver messages."),
})

export const channelsStop = pikkuSessionlessFunc({
  description: "Stop watching resources through this channel",
  input: ChannelsStopInput,
  func: async ({ googleCalendar }, data) => {
    return googleCalendar.call("POST", "/channels/stop", data)
  },
})
