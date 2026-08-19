import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const YoutubeVideoCategoriesListInput = z.object({
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
  part: z.array(z.string()).describe("The *part* parameter specifies the videoCategory resource properties that the API response will include. Set the parameter value to snippet."),
  hl: z.string().optional(),
  id: z.array(z.string()).optional().describe("Returns the video categories with the given IDs for Stubby or Apiary."),
  regionCode: z.string().optional(),
})

export const YoutubeVideoCategoriesListOutput = z.object({
  etag: z.string().optional().describe("Etag of this resource."),
  eventId: z.string().optional().describe("Serialized EventId of the request which produced this response."),
  items: z.array(z.object({
    etag: z.string().optional().describe("Etag of this resource."),
    id: z.string().optional().describe("The ID that YouTube uses to uniquely identify the video category."),
    kind: z.string().optional().default("youtube#videoCategory").describe("Identifies what kind of resource this is. Value: the fixed string \"youtube#videoCategory\"."),
    snippet: z.object({
      assignable: z.boolean().optional(),
      channelId: z.string().optional().default("UCBR8-60-B28hp2BmDPdntcQ").describe("The YouTube channel that created the video category."),
      title: z.string().optional().describe("The video category's title."),
    }).optional().describe("The snippet object contains basic details about the video category, including its title."),
  })).optional().describe("A list of video categories that can be associated with YouTube videos. In this map, the video category ID is the map key, and its value is the corresponding videoCategory resource."),
  kind: z.string().optional().default("youtube#videoCategoryListResponse").describe("Identifies what kind of resource this is. Value: the fixed string \"youtube#videoCategoryListResponse\"."),
  nextPageToken: z.string().optional().describe("The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set."),
  pageInfo: z.object({
    resultsPerPage: z.number().int().optional().describe("The number of results included in the API response."),
    totalResults: z.number().int().optional().describe("The total number of results in the result set."),
  }).optional().describe("General pagination information."),
  prevPageToken: z.string().optional().describe("The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set."),
  tokenPagination: z.record(z.string(), z.unknown()).optional().describe("Stub token pagination template to suppress results."),
  visitorId: z.string().optional().describe("The visitorId identifies the visitor."),
})

export const youtubeVideoCategoriesList = pikkuSessionlessFunc({
  description: "Retrieves a list of resources, possibly filtered.",
  input: YoutubeVideoCategoriesListInput,
  output: YoutubeVideoCategoriesListOutput,
  func: async ({ youtube }, data) => {
    return youtube.call("GET", "/youtube/v3/videoCategories", data) as any
  },
})
