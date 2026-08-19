import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const YoutubeLiveBroadcastsInsertCuepointInput = z.object({
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
  id: z.string().optional().describe("Broadcast to insert ads to, or equivalently `external_video_id` for internal use."),
  onBehalfOfContentOwner: z.string().optional().describe("*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner."),
  onBehalfOfContentOwnerChannel: z.string().optional().describe("This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel."),
  part: z.array(z.string()).optional().describe("The *part* parameter specifies a comma-separated list of one or more liveBroadcast resource properties that the API response will include. The part names that you can include in the parameter value are id, snippet, contentDetails, and status."),
  cueType: z.enum(["cueTypeUnspecified", "cueTypeAd"]).optional(),
  durationSecs: z.number().int().optional().describe("The duration of this cuepoint."),
  etag: z.string().optional(),
  insertionOffsetTimeMs: z.string().optional().describe("The time when the cuepoint should be inserted by offset to the broadcast actual start time."),
  walltimeMs: z.string().optional().describe("The wall clock time at which the cuepoint should be inserted. Only one of insertion_offset_time_ms and walltime_ms may be set at a time."),
})

export const YoutubeLiveBroadcastsInsertCuepointOutput = z.object({
  cueType: z.enum(["cueTypeUnspecified", "cueTypeAd"]).optional(),
  durationSecs: z.number().int().optional().describe("The duration of this cuepoint."),
  etag: z.string().optional(),
  id: z.string().optional().describe("The identifier for cuepoint resource."),
  insertionOffsetTimeMs: z.string().optional().describe("The time when the cuepoint should be inserted by offset to the broadcast actual start time."),
  walltimeMs: z.string().optional().describe("The wall clock time at which the cuepoint should be inserted. Only one of insertion_offset_time_ms and walltime_ms may be set at a time."),
}).describe("Note that there may be a 5-second end-point resolution issue. For instance, if a cuepoint comes in for 22:03:27, we may stuff the cuepoint into 22:03:25 or 22:03:30, depending. This is an artifact of HLS.")

export const youtubeLiveBroadcastsInsertCuepoint = pikkuSessionlessFunc({
  description: "Insert cuepoints in a broadcast",
  input: YoutubeLiveBroadcastsInsertCuepointInput,
  output: YoutubeLiveBroadcastsInsertCuepointOutput,
  func: async ({ youtube }, data) => {
    return youtube.call("POST", "/youtube/v3/liveBroadcasts/cuepoint", data) as any
  },
})
