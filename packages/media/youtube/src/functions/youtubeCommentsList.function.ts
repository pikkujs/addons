import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const YoutubeCommentsListInput = z.object({
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
  part: z.array(z.string()).describe("The *part* parameter specifies a comma-separated list of one or more comment resource properties that the API response will include."),
  id: z.array(z.string()).optional().describe("Returns the comments with the given IDs for One Platform."),
  maxResults: z.number().int().min(1).max(100).optional().describe("The *maxResults* parameter specifies the maximum number of items that should be returned in the result set."),
  pageToken: z.string().optional().describe("The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved."),
  parentId: z.string().optional().describe("Returns replies to the specified comment. Note, currently YouTube features only one level of replies (ie replies to top level comments). However replies to replies may be supported in the future."),
  textFormat: z.enum(["textFormatUnspecified", "html", "plainText"]).optional().describe("The requested text format for the returned comments."),
})

export const YoutubeCommentsListOutput = z.object({
  etag: z.string().optional().describe("Etag of this resource."),
  eventId: z.string().optional().describe("Serialized EventId of the request which produced this response."),
  items: z.array(z.object({
    etag: z.string().optional().describe("Etag of this resource."),
    id: z.string().optional().describe("The ID that YouTube uses to uniquely identify the comment."),
    kind: z.string().optional().default("youtube#comment").describe("Identifies what kind of resource this is. Value: the fixed string \"youtube#comment\"."),
    snippet: z.object({
      authorChannelId: z.object({
        value: z.string().optional(),
      }).optional().describe("The id of the author's YouTube channel, if any."),
      authorChannelUrl: z.string().optional().describe("Link to the author's YouTube channel, if any."),
      authorDisplayName: z.string().optional().describe("The name of the user who posted the comment."),
      authorProfileImageUrl: z.string().optional().describe("The URL for the avatar of the user who posted the comment."),
      canRate: z.boolean().optional().describe("Whether the current viewer can rate this comment."),
      channelId: z.string().optional().describe("The id of the corresponding YouTube channel. In case of a channel comment this is the channel the comment refers to. In case of a video comment it's the video's channel."),
      likeCount: z.number().int().optional().describe("The total number of likes this comment has received."),
      moderationStatus: z.enum(["published", "heldForReview", "likelySpam", "rejected"]).optional().describe("The comment's moderation status. Will not be set if the comments were requested through the id filter."),
      parentId: z.string().optional().describe("The unique id of the parent comment, only set for replies."),
      publishedAt: z.string().datetime().optional().describe("The date and time when the comment was originally published."),
      textDisplay: z.string().optional().describe("The comment's text. The format is either plain text or HTML dependent on what has been requested. Even the plain text representation may differ from the text originally posted in that it may replace video links with video titles etc."),
      textOriginal: z.string().optional().describe("The comment's original raw text as initially posted or last updated. The original text will only be returned if it is accessible to the viewer, which is only guaranteed if the viewer is the comment's author."),
      updatedAt: z.string().datetime().optional().describe("The date and time when the comment was last updated."),
      videoId: z.string().optional().describe("The ID of the video the comment refers to, if any."),
      viewerRating: z.enum(["none", "like", "dislike"]).optional().describe("The rating the viewer has given to this comment. For the time being this will never return RATE_TYPE_DISLIKE and instead return RATE_TYPE_NONE. This may change in the future."),
    }).optional().describe("The snippet object contains basic details about the comment."),
  })).optional().describe("A list of comments that match the request criteria."),
  kind: z.string().optional().default("youtube#commentListResponse").describe("Identifies what kind of resource this is. Value: the fixed string \"youtube#commentListResponse\"."),
  nextPageToken: z.string().optional().describe("The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set."),
  pageInfo: z.object({
    resultsPerPage: z.number().int().optional().describe("The number of results included in the API response."),
    totalResults: z.number().int().optional().describe("The total number of results in the result set."),
  }).optional().describe("General pagination information."),
  tokenPagination: z.record(z.string(), z.unknown()).optional().describe("Stub token pagination template to suppress results."),
  visitorId: z.string().optional().describe("The visitorId identifies the visitor."),
})

export const youtubeCommentsList = pikkuSessionlessFunc({
  description: "Retrieves a list of resources, possibly filtered.",
  input: YoutubeCommentsListInput,
  output: YoutubeCommentsListOutput,
  func: async ({ youtube }, data) => {
    return youtube.call("GET", "/youtube/v3/comments", data) as any
  },
})
