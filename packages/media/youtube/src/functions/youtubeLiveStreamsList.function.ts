import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const YoutubeLiveStreamsListInput = z.object({
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
  part: z.array(z.string()).describe("The *part* parameter specifies a comma-separated list of one or more liveStream resource properties that the API response will include. The part names that you can include in the parameter value are id, snippet, cdn, and status."),
  id: z.array(z.string()).optional().describe("Return LiveStreams with the given ids from Stubby or Apiary."),
  maxResults: z.number().int().min(0).max(50).optional().describe("The *maxResults* parameter specifies the maximum number of items that should be returned in the result set."),
  mine: z.boolean().optional(),
  onBehalfOfContentOwner: z.string().optional().describe("*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner."),
  onBehalfOfContentOwnerChannel: z.string().optional().describe("This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel."),
  pageToken: z.string().optional().describe("The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved."),
})

export const YoutubeLiveStreamsListOutput = z.object({
  etag: z.string().optional().describe("Etag of this resource."),
  eventId: z.string().optional().describe("Serialized EventId of the request which produced this response."),
  items: z.array(z.object({
    cdn: z.object({
      format: z.string().optional().describe("The format of the video stream that you are sending to Youtube. "),
      frameRate: z.enum(["30fps", "60fps", "variable"]).optional().describe("The frame rate of the inbound video data."),
      ingestionInfo: z.object({
        backupIngestionAddress: z.string().optional().describe("The backup ingestion URL that you should use to stream video to YouTube. You have the option of simultaneously streaming the content that you are sending to the ingestionAddress to this URL."),
        ingestionAddress: z.string().optional().describe("The primary ingestion URL that you should use to stream video to YouTube. You must stream video to this URL. Depending on which application or tool you use to encode your video stream, you may need to enter the stream URL and stream name separately or you may need to concatenate them in the following format: *STREAM_URL/STREAM_NAME* "),
        rtmpsBackupIngestionAddress: z.string().optional().describe("This ingestion url may be used instead of backupIngestionAddress in order to stream via RTMPS. Not applicable to non-RTMP streams."),
        rtmpsIngestionAddress: z.string().optional().describe("This ingestion url may be used instead of ingestionAddress in order to stream via RTMPS. Not applicable to non-RTMP streams."),
        streamName: z.string().optional().describe("The stream name that YouTube assigns to the video stream."),
      }).optional().describe("The ingestionInfo object contains information that YouTube provides that you need to transmit your RTMP or HTTP stream to YouTube."),
      ingestionType: z.enum(["rtmp", "dash", "webrtc", "hls"]).optional().describe(" The method or protocol used to transmit the video stream."),
      resolution: z.enum(["240p", "360p", "480p", "720p", "1080p", "1440p", "2160p", "variable"]).optional().describe("The resolution of the inbound video data."),
    }).optional().describe("The cdn object defines the live stream's content delivery network (CDN) settings. These settings provide details about the manner in which you stream your content to YouTube."),
    contentDetails: z.object({
      closedCaptionsIngestionUrl: z.string().optional().describe("The ingestion URL where the closed captions of this stream are sent."),
      isReusable: z.boolean().optional().describe("Indicates whether the stream is reusable, which means that it can be bound to multiple broadcasts. It is common for broadcasters to reuse the same stream for many different broadcasts if those broadcasts occur at different times. If you set this value to false, then the stream will not be reusable, which means that it can only be bound to one broadcast. Non-reusable streams differ from reusable streams in the following ways: - A non-reusable stream can only be bound to one broadcast. - A non-reusable stream might be deleted by an automated process after the broadcast ends. - The liveStreams.list method does not list non-reusable streams if you call the method and set the mine parameter to true. The only way to use that method to retrieve the resource for a non-reusable stream is to use the id parameter to identify the stream. "),
    }).optional().describe("The content_details object contains information about the stream, including the closed captions ingestion URL."),
    etag: z.string().optional().describe("Etag of this resource."),
    id: z.string().optional().describe("The ID that YouTube assigns to uniquely identify the stream."),
    kind: z.string().optional().default("youtube#liveStream").describe("Identifies what kind of resource this is. Value: the fixed string \"youtube#liveStream\"."),
    snippet: z.object({
      channelId: z.string().optional().describe("The ID that YouTube uses to uniquely identify the channel that is transmitting the stream."),
      description: z.string().optional().describe("The stream's description. The value cannot be longer than 10000 characters."),
      isDefaultStream: z.boolean().optional(),
      publishedAt: z.string().datetime().optional().describe("The date and time that the stream was created."),
      title: z.string().optional().describe("The stream's title. The value must be between 1 and 128 characters long."),
    }).optional().describe("The snippet object contains basic details about the stream, including its channel, title, and description."),
    status: z.object({
      healthStatus: z.object({
        configurationIssues: z.array(z.object({
          description: z.string().optional().describe("The long-form description of the issue and how to resolve it."),
          reason: z.string().optional().describe("The short-form reason for this issue."),
          severity: z.enum(["info", "warning", "error"]).optional().describe("How severe this issue is to the stream."),
          type: z.enum(["gopSizeOver", "gopSizeLong", "gopSizeShort", "openGop", "badContainer", "audioBitrateHigh", "audioBitrateLow", "audioSampleRate", "bitrateHigh", "bitrateLow", "audioCodec", "videoCodec", "noAudioStream", "noVideoStream", "multipleVideoStreams", "multipleAudioStreams", "audioTooManyChannels", "interlacedVideo", "frameRateHigh", "resolutionMismatch", "videoCodecMismatch", "videoInterlaceMismatch", "videoProfileMismatch", "videoBitrateMismatch", "framerateMismatch", "gopMismatch", "audioSampleRateMismatch", "audioStereoMismatch", "audioCodecMismatch", "audioBitrateMismatch", "videoResolutionSuboptimal", "videoResolutionUnsupported", "videoIngestionStarved", "videoIngestionFasterThanRealtime"]).optional().describe("The kind of error happening."),
        })).optional().describe("The configurations issues on this stream"),
        lastUpdateTimeSeconds: z.string().optional().describe("The last time this status was updated (in seconds)"),
        status: z.enum(["good", "ok", "bad", "noData", "revoked"]).optional().describe("The status code of this stream"),
      }).optional().describe("The health status of the stream."),
      streamStatus: z.enum(["created", "ready", "active", "inactive", "error"]).optional(),
    }).optional().describe("The status object contains information about live stream's status."),
  })).optional().describe("A list of live streams that match the request criteria."),
  kind: z.string().optional().default("youtube#liveStreamListResponse").describe("Identifies what kind of resource this is. Value: the fixed string \"youtube#liveStreamListResponse\"."),
  nextPageToken: z.string().optional().describe("The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set."),
  pageInfo: z.object({
    resultsPerPage: z.number().int().optional().describe("The number of results included in the API response."),
    totalResults: z.number().int().optional().describe("The total number of results in the result set."),
  }).optional().describe("Paging details for lists of resources, including total number of items available and number of resources returned in a single page."),
  prevPageToken: z.string().optional().describe("The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set."),
  tokenPagination: z.record(z.string(), z.unknown()).optional().describe("Stub token pagination template to suppress results."),
  visitorId: z.string().optional().describe("The visitorId identifies the visitor."),
})

export const youtubeLiveStreamsList = pikkuSessionlessFunc({
  description: "Retrieve the list of streams associated with the given channel. --",
  input: YoutubeLiveStreamsListInput,
  output: YoutubeLiveStreamsListOutput,
  func: async ({ youtube }, data) => {
    return youtube.call("GET", "/youtube/v3/liveStreams", data) as any
  },
})
