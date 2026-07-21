import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const YoutubeCommentThreadsInsertInput = z.object({
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
  part: z.array(z.string()).describe("The *part* parameter identifies the properties that the API response will include. Set the parameter value to snippet. The snippet part has a quota cost of 2 units."),
  etag: z.string().optional().describe("Etag of this resource."),
  id: z.string().optional().describe("The ID that YouTube uses to uniquely identify the comment thread."),
  kind: z.string().optional().default("youtube#commentThread").describe("Identifies what kind of resource this is. Value: the fixed string \"youtube#commentThread\"."),
  replies: z.object({
  comments: z.array(z.object({
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
  })).optional().describe("A limited number of replies. Unless the number of replies returned equals total_reply_count in the snippet the returned replies are only a subset of the total number of replies."),
}).optional().describe("The replies object contains a limited number of replies (if any) to the top level comment found in the snippet."),
  snippet: z.object({
  canReply: z.boolean().optional().describe("Whether the current viewer of the thread can reply to it. This is viewer specific - other viewers may see a different value for this field."),
  channelId: z.string().optional().describe("The YouTube channel the comments in the thread refer to or the channel with the video the comments refer to. If video_id isn't set the comments refer to the channel itself."),
  isPublic: z.boolean().optional().describe("Whether the thread (and therefore all its comments) is visible to all YouTube users."),
  topLevelComment: z.object({
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
  }).optional().describe("The top level comment of this thread."),
  totalReplyCount: z.number().int().optional().describe("The total number of replies (not including the top level comment)."),
  videoId: z.string().optional().describe("The ID of the video the comments refer to, if any. No video_id implies a channel discussion comment."),
}).optional().describe("The snippet object contains basic details about the comment thread and also the top level comment."),
})

export const YoutubeCommentThreadsInsertOutput = z.object({
  etag: z.string().optional().describe("Etag of this resource."),
  id: z.string().optional().describe("The ID that YouTube uses to uniquely identify the comment thread."),
  kind: z.string().optional().default("youtube#commentThread").describe("Identifies what kind of resource this is. Value: the fixed string \"youtube#commentThread\"."),
  replies: z.object({
    comments: z.array(z.object({
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
    })).optional().describe("A limited number of replies. Unless the number of replies returned equals total_reply_count in the snippet the returned replies are only a subset of the total number of replies."),
  }).optional().describe("The replies object contains a limited number of replies (if any) to the top level comment found in the snippet."),
  snippet: z.object({
    canReply: z.boolean().optional().describe("Whether the current viewer of the thread can reply to it. This is viewer specific - other viewers may see a different value for this field."),
    channelId: z.string().optional().describe("The YouTube channel the comments in the thread refer to or the channel with the video the comments refer to. If video_id isn't set the comments refer to the channel itself."),
    isPublic: z.boolean().optional().describe("Whether the thread (and therefore all its comments) is visible to all YouTube users."),
    topLevelComment: z.object({
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
    }).optional().describe("The top level comment of this thread."),
    totalReplyCount: z.number().int().optional().describe("The total number of replies (not including the top level comment)."),
    videoId: z.string().optional().describe("The ID of the video the comments refer to, if any. No video_id implies a channel discussion comment."),
  }).optional().describe("The snippet object contains basic details about the comment thread and also the top level comment."),
}).describe("A *comment thread* represents information that applies to a top level comment and all its replies. It can also include the top level comment itself and some of the replies.")

export const youtubeCommentThreadsInsert = pikkuSessionlessFunc({
  description: "Inserts a new resource into this collection.",
  input: YoutubeCommentThreadsInsertInput,
  output: YoutubeCommentThreadsInsertOutput,
  func: async ({ youtube }, data) => {
    return youtube.call("POST", "/youtube/v3/commentThreads", data) as any
  },
})
