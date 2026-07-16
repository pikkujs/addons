import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const YoutubeI18nRegionsListInput = z.object({
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
  part: z.array(z.string()).describe("The *part* parameter specifies the i18nRegion resource properties that the API response will include. Set the parameter value to snippet."),
  hl: z.string().optional(),
})

export const YoutubeI18nRegionsListOutput = z.object({
  etag: z.string().optional().describe("Etag of this resource."),
  eventId: z.string().optional().describe("Serialized EventId of the request which produced this response."),
  items: z.array(z.object({
    etag: z.string().optional().describe("Etag of this resource."),
    id: z.string().optional().describe("The ID that YouTube uses to uniquely identify the i18n region."),
    kind: z.string().optional().default("youtube#i18nRegion").describe("Identifies what kind of resource this is. Value: the fixed string \"youtube#i18nRegion\"."),
    snippet: z.object({
      gl: z.string().optional().describe("The region code as a 2-letter ISO country code."),
      name: z.string().optional().describe("The human-readable name of the region."),
    }).optional().describe("The snippet object contains basic details about the i18n region, such as region code and human-readable name."),
  })).optional().describe("A list of regions where YouTube is available. In this map, the i18n region ID is the map key, and its value is the corresponding i18nRegion resource."),
  kind: z.string().optional().default("youtube#i18nRegionListResponse").describe("Identifies what kind of resource this is. Value: the fixed string \"youtube#i18nRegionListResponse\"."),
  visitorId: z.string().optional().describe("The visitorId identifies the visitor."),
})

export const youtubeI18nRegionsList = pikkuSessionlessFunc({
  description: "Retrieves a list of resources, possibly filtered.",
  input: YoutubeI18nRegionsListInput,
  output: YoutubeI18nRegionsListOutput,
  func: async ({ youtube }, data) => {
    return youtube.call("GET", "/youtube/v3/i18nRegions", data) as any
  },
})
