import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const YoutubeLiveChatModeratorsListInput = z.object({
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
  liveChatId: z.string().describe("The id of the live chat for which moderators should be returned."),
  part: z.array(z.string()).describe("The *part* parameter specifies the liveChatModerator resource parts that the API response will include. Supported values are id and snippet."),
  maxResults: z.number().int().min(0).max(50).optional().describe("The *maxResults* parameter specifies the maximum number of items that should be returned in the result set."),
  pageToken: z.string().optional().describe("The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved."),
})

export const YoutubeLiveChatModeratorsListOutput = z.object({
  etag: z.string().optional().describe("Etag of this resource."),
  eventId: z.string().optional().describe("Serialized EventId of the request which produced this response."),
  items: z.array(z.object({
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
  })).optional().describe("A list of moderators that match the request criteria."),
  kind: z.string().optional().default("youtube#liveChatModeratorListResponse").describe("Identifies what kind of resource this is. Value: the fixed string \"youtube#liveChatModeratorListResponse\"."),
  nextPageToken: z.string().optional().describe("The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set."),
  pageInfo: z.object({
    resultsPerPage: z.number().int().optional().describe("The number of results included in the API response."),
    totalResults: z.number().int().optional().describe("The total number of results in the result set."),
  }).optional().describe("General pagination information."),
  prevPageToken: z.string().optional().describe("The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set."),
  tokenPagination: z.record(z.string(), z.unknown()).optional().describe("Stub token pagination template to suppress results."),
  visitorId: z.string().optional().describe("The visitorId identifies the visitor."),
})

export const youtubeLiveChatModeratorsList = pikkuSessionlessFunc({
  description: "Retrieves a list of resources, possibly filtered.",
  input: YoutubeLiveChatModeratorsListInput,
  output: YoutubeLiveChatModeratorsListOutput,
  func: async ({ youtube }, data) => {
    return youtube.call("GET", "/youtube/v3/liveChat/moderators", data) as any
  },
})
