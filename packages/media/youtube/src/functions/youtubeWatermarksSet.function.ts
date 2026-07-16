import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const YoutubeWatermarksSetInput = z.object({
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
  channelId: z.string(),
  onBehalfOfContentOwner: z.string().optional().describe("*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner."),
  imageBytes: z.string().optional().describe("The bytes the uploaded image. Only used in api to youtube communication."),
  imageUrl: z.string().optional().describe("The url of the uploaded image. Only used in apiary to api communication."),
  position: z.object({
  cornerPosition: z.enum(["topLeft", "topRight", "bottomLeft", "bottomRight"]).optional().describe("Describes in which corner of the video the visual widget will appear."),
  type: z.literal("corner").optional().describe("Defines the position type."),
}).optional().describe("The spatial position within the video where the branding watermark will be displayed."),
  targetChannelId: z.string().optional().describe("The channel to which this branding links. If not present it defaults to the current channel."),
  timing: z.object({
  durationMs: z.string().optional().describe("Defines the duration in milliseconds for which the promotion should be displayed. If missing, the client should use the default."),
  offsetMs: z.string().optional().describe("Defines the time at which the promotion will appear. Depending on the value of type the value of the offsetMs field will represent a time offset from the start or from the end of the video, expressed in milliseconds."),
  type: z.enum(["offsetFromStart", "offsetFromEnd"]).optional().describe("Describes a timing type. If the value is offsetFromStart, then the offsetMs field represents an offset from the start of the video. If the value is offsetFromEnd, then the offsetMs field represents an offset from the end of the video."),
}).optional().describe("The temporal position within the video where watermark will be displayed."),
})

export const youtubeWatermarksSet = pikkuSessionlessFunc({
  description: "Allows upload of watermark image and setting it for a channel.",
  input: YoutubeWatermarksSetInput,
  func: async ({ youtube }, data) => {
    return youtube.call("POST", "/youtube/v3/watermarks/set", data)
  },
})
