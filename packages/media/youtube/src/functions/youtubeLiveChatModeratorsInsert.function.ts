import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const YoutubeLiveChatModeratorsInsertInput = z.object({
  "$.xgafv": z.enum(["1", "2"]).optional().describe("V1 error format."),
  access_token: z.string().optional().describe("OAuth access token."),
  alt: z.enum(["json", "media", "proto"]).optional().describe("Data format for response."),
  callback: z.string().optional().describe("JSONP"),
  fields: z.string().optional().describe("Selector specifying which fields to include in a partial response."),
  key: z.string().optional().describe("API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token."),
  oauth_token: z.string().optional().describe("OAuth 2.0 token for the current user."),
  prettyPrint: z.boolean().optional().describe("Returns response with indentations and line breaks."),
  quotaUser: z.string().optional().describe("Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters."),
  upload_protocol: z.string().optional().describe("Upload protocol for media (e.g. \"raw\", \"multipart\")."),
  uploadType: z.string().optional().describe("Legacy upload protocol for media (e.g. \"media\", \"multipart\")."),
  part: z.array(z.string()).describe("The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response returns. Set the parameter value to snippet."),
  etag: z.string().optional().describe("Etag of this resource."),
  id: z.string().optional().describe("The ID that YouTube assigns to uniquely identify the moderator."),
  kind: z.string().optional().default("youtube#liveChatModerator").describe("Identifies what kind of resource this is. Value: the fixed string \"youtube#liveChatModerator\"."),
  snippet: z.object({
  liveChatId: z.string().optional().describe("The ID of the live chat this moderator can act on."),
  moderatorDetails: z.object({
    channelId: z.string().optional().describe("The YouTube channel ID."),
    channelUrl: z.string().optional().describe("The channel's URL."),
    displayName: z.string().optional().describe("The channel's display name."),
    profileImageUrl: z.string().optional().describe("The channels's avatar URL."),
  }).optional().describe("Details about the moderator."),
}).optional().describe("The snippet object contains basic details about the moderator."),
})

export const YoutubeLiveChatModeratorsInsertOutput = z.object({
  etag: z.string().optional().describe("Etag of this resource."),
  id: z.string().optional().describe("The ID that YouTube assigns to uniquely identify the moderator."),
  kind: z.string().optional().default("youtube#liveChatModerator").describe("Identifies what kind of resource this is. Value: the fixed string \"youtube#liveChatModerator\"."),
  snippet: z.object({
    liveChatId: z.string().optional().describe("The ID of the live chat this moderator can act on."),
    moderatorDetails: z.object({
      channelId: z.string().optional().describe("The YouTube channel ID."),
      channelUrl: z.string().optional().describe("The channel's URL."),
      displayName: z.string().optional().describe("The channel's display name."),
      profileImageUrl: z.string().optional().describe("The channels's avatar URL."),
    }).optional().describe("Details about the moderator."),
  }).optional().describe("The snippet object contains basic details about the moderator."),
}).describe("A *liveChatModerator* resource represents a moderator for a YouTube live chat. A chat moderator has the ability to ban/unban users from a chat, remove message, etc.")

export const youtubeLiveChatModeratorsInsert = pikkuSessionlessFunc({
  description: "Inserts a new resource into this collection.",
  input: YoutubeLiveChatModeratorsInsertInput,
  output: YoutubeLiveChatModeratorsInsertOutput,
  func: async ({ youtube }, data) => {
    return youtube.call("POST", "/youtube/v3/liveChat/moderators", data) as any
  },
})
