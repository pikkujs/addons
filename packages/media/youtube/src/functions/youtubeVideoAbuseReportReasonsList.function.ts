import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const YoutubeVideoAbuseReportReasonsListInput = z.object({
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
  part: z.array(z.string()).describe("The *part* parameter specifies the videoCategory resource parts that the API response will include. Supported values are id and snippet."),
  hl: z.string().optional(),
})

export const YoutubeVideoAbuseReportReasonsListOutput = z.object({
  etag: z.string().optional().describe("Etag of this resource."),
  eventId: z.string().optional().describe("Serialized EventId of the request which produced this response."),
  items: z.array(z.object({
    etag: z.string().optional().describe("Etag of this resource."),
    id: z.string().optional().describe("The ID of this abuse report reason."),
    kind: z.string().optional().default("youtube#videoAbuseReportReason").describe("Identifies what kind of resource this is. Value: the fixed string `\"youtube#videoAbuseReportReason\"`."),
    snippet: z.object({
      label: z.string().optional().describe("The localized label belonging to this abuse report reason."),
      secondaryReasons: z.array(z.object({
        id: z.string().optional().describe("The ID of this abuse report secondary reason."),
        label: z.string().optional().describe("The localized label for this abuse report secondary reason."),
      })).optional().describe("The secondary reasons associated with this reason, if any are available. (There might be 0 or more.)"),
    }).optional().describe("The `snippet` object contains basic details about the abuse report reason."),
  })).optional().describe("A list of valid abuse reasons that are used with `video.ReportAbuse`."),
  kind: z.string().optional().default("youtube#videoAbuseReportReasonListResponse").describe("Identifies what kind of resource this is. Value: the fixed string `\"youtube#videoAbuseReportReasonListResponse\"`."),
  visitorId: z.string().optional().describe("The `visitorId` identifies the visitor."),
})

export const youtubeVideoAbuseReportReasonsList = pikkuSessionlessFunc({
  description: "Retrieves a list of resources, possibly filtered.",
  input: YoutubeVideoAbuseReportReasonsListInput,
  output: YoutubeVideoAbuseReportReasonsListOutput,
  func: async ({ youtube }, data) => {
    return youtube.call("GET", "/youtube/v3/videoAbuseReportReasons", data) as any
  },
})
