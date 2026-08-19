import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const YoutubeThumbnailsSetInput = z.object({
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
  videoId: z.string().describe("Returns the Thumbnail with the given video IDs for Stubby or Apiary."),
  onBehalfOfContentOwner: z.string().optional().describe("*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner."),
})

export const YoutubeThumbnailsSetOutput = z.object({
  etag: z.string().optional().describe("Etag of this resource."),
  eventId: z.string().optional().describe("Serialized EventId of the request which produced this response."),
  items: z.array(z.object({
    high: z.object({
      height: z.number().int().optional().describe("(Optional) Height of the thumbnail image."),
      url: z.string().optional().describe("The thumbnail image's URL."),
      width: z.number().int().optional().describe("(Optional) Width of the thumbnail image."),
    }).optional().describe("The high quality image for this resource."),
    maxres: z.object({
      height: z.number().int().optional().describe("(Optional) Height of the thumbnail image."),
      url: z.string().optional().describe("The thumbnail image's URL."),
      width: z.number().int().optional().describe("(Optional) Width of the thumbnail image."),
    }).optional().describe("The maximum resolution quality image for this resource."),
    medium: z.object({
      height: z.number().int().optional().describe("(Optional) Height of the thumbnail image."),
      url: z.string().optional().describe("The thumbnail image's URL."),
      width: z.number().int().optional().describe("(Optional) Width of the thumbnail image."),
    }).optional().describe("The medium quality image for this resource."),
    standard: z.object({
      height: z.number().int().optional().describe("(Optional) Height of the thumbnail image."),
      url: z.string().optional().describe("The thumbnail image's URL."),
      width: z.number().int().optional().describe("(Optional) Width of the thumbnail image."),
    }).optional().describe("The standard quality image for this resource."),
  })).optional().describe("A list of thumbnails."),
  kind: z.string().optional().default("youtube#thumbnailSetResponse").describe("Identifies what kind of resource this is. Value: the fixed string \"youtube#thumbnailSetResponse\"."),
  visitorId: z.string().optional().describe("The visitorId identifies the visitor."),
})

export const youtubeThumbnailsSet = pikkuSessionlessFunc({
  description: "As this is not an insert in a strict sense (it supports uploading/setting of a thumbnail for multiple videos, which doesn't result in creation of a single resource), I use a custom verb here.",
  input: YoutubeThumbnailsSetInput,
  output: YoutubeThumbnailsSetOutput,
  func: async ({ youtube }, data) => {
    return youtube.call("POST", "/youtube/v3/thumbnails/set", data) as any
  },
})
