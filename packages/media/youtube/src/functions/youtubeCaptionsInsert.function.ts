import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const YoutubeCaptionsInsertInput = z.object({
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
  part: z.array(z.string()).describe("The *part* parameter specifies the caption resource parts that the API response will include. Set the parameter value to snippet."),
  onBehalfOf: z.string().optional().describe("ID of the Google+ Page for the channel that the request is be on behalf of"),
  onBehalfOfContentOwner: z.string().optional().describe("*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner."),
  sync: z.boolean().optional().describe("Extra parameter to allow automatically syncing the uploaded caption/transcript with the audio."),
  etag: z.string().optional().describe("Etag of this resource."),
  id: z.string().optional().describe("The ID that YouTube uses to uniquely identify the caption track."),
  kind: z.string().optional().default("youtube#caption").describe("Identifies what kind of resource this is. Value: the fixed string \"youtube#caption\"."),
  snippet: z.object({
  audioTrackType: z.enum(["unknown", "primary", "commentary", "descriptive"]).optional().describe("The type of audio track associated with the caption track."),
  failureReason: z.enum(["unknownFormat", "unsupportedFormat", "processingFailed"]).optional().describe("The reason that YouTube failed to process the caption track. This property is only present if the state property's value is failed."),
  isAutoSynced: z.boolean().optional().describe("Indicates whether YouTube synchronized the caption track to the audio track in the video. The value will be true if a sync was explicitly requested when the caption track was uploaded. For example, when calling the captions.insert or captions.update methods, you can set the sync parameter to true to instruct YouTube to sync the uploaded track to the video. If the value is false, YouTube uses the time codes in the uploaded caption track to determine when to display captions."),
  isCC: z.boolean().optional().describe("Indicates whether the track contains closed captions for the deaf and hard of hearing. The default value is false."),
  isDraft: z.boolean().optional().describe("Indicates whether the caption track is a draft. If the value is true, then the track is not publicly visible. The default value is false. @mutable youtube.captions.insert youtube.captions.update"),
  isEasyReader: z.boolean().optional().describe("Indicates whether caption track is formatted for \"easy reader,\" meaning it is at a third-grade level for language learners. The default value is false."),
  isLarge: z.boolean().optional().describe("Indicates whether the caption track uses large text for the vision-impaired. The default value is false."),
  language: z.string().optional().describe("The language of the caption track. The property value is a BCP-47 language tag."),
  lastUpdated: z.string().datetime().optional().describe("The date and time when the caption track was last updated."),
  name: z.string().optional().describe("The name of the caption track. The name is intended to be visible to the user as an option during playback."),
  status: z.enum(["serving", "syncing", "failed"]).optional().describe("The caption track's status."),
  trackKind: z.enum(["standard", "ASR", "forced"]).optional().describe("The caption track's type."),
  videoId: z.string().optional().describe("The ID that YouTube uses to uniquely identify the video associated with the caption track. @mutable youtube.captions.insert"),
}).optional().describe("The snippet object contains basic details about the caption."),
})

export const YoutubeCaptionsInsertOutput = z.object({
  etag: z.string().optional().describe("Etag of this resource."),
  id: z.string().optional().describe("The ID that YouTube uses to uniquely identify the caption track."),
  kind: z.string().optional().default("youtube#caption").describe("Identifies what kind of resource this is. Value: the fixed string \"youtube#caption\"."),
  snippet: z.object({
    audioTrackType: z.enum(["unknown", "primary", "commentary", "descriptive"]).optional().describe("The type of audio track associated with the caption track."),
    failureReason: z.enum(["unknownFormat", "unsupportedFormat", "processingFailed"]).optional().describe("The reason that YouTube failed to process the caption track. This property is only present if the state property's value is failed."),
    isAutoSynced: z.boolean().optional().describe("Indicates whether YouTube synchronized the caption track to the audio track in the video. The value will be true if a sync was explicitly requested when the caption track was uploaded. For example, when calling the captions.insert or captions.update methods, you can set the sync parameter to true to instruct YouTube to sync the uploaded track to the video. If the value is false, YouTube uses the time codes in the uploaded caption track to determine when to display captions."),
    isCC: z.boolean().optional().describe("Indicates whether the track contains closed captions for the deaf and hard of hearing. The default value is false."),
    isDraft: z.boolean().optional().describe("Indicates whether the caption track is a draft. If the value is true, then the track is not publicly visible. The default value is false. @mutable youtube.captions.insert youtube.captions.update"),
    isEasyReader: z.boolean().optional().describe("Indicates whether caption track is formatted for \"easy reader,\" meaning it is at a third-grade level for language learners. The default value is false."),
    isLarge: z.boolean().optional().describe("Indicates whether the caption track uses large text for the vision-impaired. The default value is false."),
    language: z.string().optional().describe("The language of the caption track. The property value is a BCP-47 language tag."),
    lastUpdated: z.string().datetime().optional().describe("The date and time when the caption track was last updated."),
    name: z.string().optional().describe("The name of the caption track. The name is intended to be visible to the user as an option during playback."),
    status: z.enum(["serving", "syncing", "failed"]).optional().describe("The caption track's status."),
    trackKind: z.enum(["standard", "ASR", "forced"]).optional().describe("The caption track's type."),
    videoId: z.string().optional().describe("The ID that YouTube uses to uniquely identify the video associated with the caption track. @mutable youtube.captions.insert"),
  }).optional().describe("The snippet object contains basic details about the caption."),
}).describe("A *caption* resource represents a YouTube caption track. A caption track is associated with exactly one YouTube video.")

export const youtubeCaptionsInsert = pikkuSessionlessFunc({
  description: "Inserts a new resource into this collection.",
  input: YoutubeCaptionsInsertInput,
  output: YoutubeCaptionsInsertOutput,
  func: async ({ youtube }, data) => {
    return youtube.call("POST", "/youtube/v3/captions", data) as any
  },
})
