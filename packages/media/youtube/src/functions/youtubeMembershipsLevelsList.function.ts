import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const YoutubeMembershipsLevelsListInput = z.object({
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
  part: z.array(z.string()).describe("The *part* parameter specifies the membershipsLevel resource parts that the API response will include. Supported values are id and snippet."),
})

export const YoutubeMembershipsLevelsListOutput = z.object({
  etag: z.string().optional().describe("Etag of this resource."),
  eventId: z.string().optional().describe("Serialized EventId of the request which produced this response."),
  items: z.array(z.object({
    etag: z.string().optional().describe("Etag of this resource."),
    id: z.string().optional().describe("The ID that YouTube assigns to uniquely identify the memberships level."),
    kind: z.string().optional().default("youtube#membershipsLevel").describe("Identifies what kind of resource this is. Value: the fixed string \"youtube#membershipsLevelListResponse\"."),
    snippet: z.object({
      creatorChannelId: z.string().optional().describe("The id of the channel that's offering channel memberships."),
      levelDetails: z.object({
        displayName: z.string().optional().describe("The name that should be used when referring to this level."),
      }).optional().describe("Details about the pricing level."),
    }).optional().describe("The snippet object contains basic details about the level."),
  })).optional().describe("A list of pricing levels offered by a creator to the fans."),
  kind: z.string().optional().default("youtube#membershipsLevelListResponse").describe("Identifies what kind of resource this is. Value: the fixed string \"youtube#membershipsLevelListResponse\"."),
  visitorId: z.string().optional().describe("The visitorId identifies the visitor."),
})

export const youtubeMembershipsLevelsList = pikkuSessionlessFunc({
  description: "Retrieves a list of all pricing levels offered by a creator to the fans.",
  input: YoutubeMembershipsLevelsListInput,
  output: YoutubeMembershipsLevelsListOutput,
  func: async ({ youtube }, data) => {
    return youtube.call("GET", "/youtube/v3/membershipsLevels", data) as any
  },
})
