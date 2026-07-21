import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const YoutubeMembersListInput = z.object({
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
  part: z.array(z.string()).describe("The *part* parameter specifies the member resource parts that the API response will include. Set the parameter value to snippet."),
  filterByMemberChannelId: z.string().optional().describe("Comma separated list of channel IDs. Only data about members that are part of this list will be included in the response."),
  hasAccessToLevel: z.string().optional().describe("Filter members in the results set to the ones that have access to a level."),
  maxResults: z.number().int().min(0).max(1000).optional().describe("The *maxResults* parameter specifies the maximum number of items that should be returned in the result set."),
  mode: z.enum(["listMembersModeUnknown", "updates", "all_current"]).optional().describe("Parameter that specifies which channel members to return."),
  pageToken: z.string().optional().describe("The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved."),
})

export const YoutubeMembersListOutput = z.object({
  etag: z.string().optional().describe("Etag of this resource."),
  eventId: z.string().optional().describe("Serialized EventId of the request which produced this response."),
  items: z.array(z.object({
    etag: z.string().optional().describe("Etag of this resource."),
    kind: z.string().optional().default("youtube#member").describe("Identifies what kind of resource this is. Value: the fixed string \"youtube#member\"."),
    snippet: z.object({
      creatorChannelId: z.string().optional().describe("The id of the channel that's offering memberships."),
      memberDetails: z.object({
        channelId: z.string().optional().describe("The YouTube channel ID."),
        channelUrl: z.string().optional().describe("The channel's URL."),
        displayName: z.string().optional().describe("The channel's display name."),
        profileImageUrl: z.string().optional().describe("The channels's avatar URL."),
      }).optional().describe("Details about the member."),
      membershipsDetails: z.object({
        accessibleLevels: z.array(z.string()).optional().describe("Ids of all levels that the user has access to. This includes the currently active level and all other levels that are included because of a higher purchase."),
        highestAccessibleLevel: z.string().optional().describe("Id of the highest level that the user has access to at the moment."),
        highestAccessibleLevelDisplayName: z.string().optional().describe("Display name for the highest level that the user has access to at the moment."),
        membershipsDuration: z.object({
          memberSince: z.string().optional().describe("The date and time when the user became a continuous member across all levels."),
          memberTotalDurationMonths: z.number().int().optional().describe("The cumulative time the user has been a member across all levels in complete months (the time is rounded down to the nearest integer)."),
        }).optional().describe("Data about memberships duration without taking into consideration pricing levels."),
        membershipsDurationAtLevels: z.array(z.object({
          level: z.string().optional().describe("Pricing level ID."),
          memberSince: z.string().optional().describe("The date and time when the user became a continuous member for the given level."),
          memberTotalDurationMonths: z.number().int().optional().describe("The cumulative time the user has been a member for the given level in complete months (the time is rounded down to the nearest integer)."),
        })).optional().describe("Data about memberships duration on particular pricing levels."),
      }).optional().describe("Details about the user's membership."),
    }).optional().describe("The snippet object contains basic details about the member."),
  })).optional().describe("A list of members that match the request criteria."),
  kind: z.string().optional().default("youtube#memberListResponse").describe("Identifies what kind of resource this is. Value: the fixed string \"youtube#memberListResponse\"."),
  nextPageToken: z.string().optional().describe("The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set."),
  pageInfo: z.object({
    resultsPerPage: z.number().int().optional().describe("The number of results included in the API response."),
    totalResults: z.number().int().optional().describe("The total number of results in the result set."),
  }).optional().describe("Paging details for lists of resources, including total number of items available and number of resources returned in a single page."),
  tokenPagination: z.record(z.string(), z.unknown()).optional().describe("Stub token pagination template to suppress results."),
  visitorId: z.string().optional().describe("The visitorId identifies the visitor."),
})

export const youtubeMembersList = pikkuSessionlessFunc({
  description: "Retrieves a list of members that match the request criteria for a channel.",
  input: YoutubeMembersListInput,
  output: YoutubeMembersListOutput,
  func: async ({ youtube }, data) => {
    return youtube.call("GET", "/youtube/v3/members", data) as any
  },
})
