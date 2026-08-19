import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const YoutubeActivitiesListInput = z.object({
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
  part: z.array(z.string()).describe("The *part* parameter specifies a comma-separated list of one or more activity resource properties that the API response will include. If the parameter identifies a property that contains child properties, the child properties will be included in the response. For example, in an activity resource, the snippet property contains other properties that identify the type of activity, a display title for the activity, and so forth. If you set *part=snippet*, the API response will also contain all of those nested properties."),
  channelId: z.string().optional(),
  home: z.boolean().optional(),
  maxResults: z.number().int().min(0).max(50).optional().describe("The *maxResults* parameter specifies the maximum number of items that should be returned in the result set."),
  mine: z.boolean().optional(),
  pageToken: z.string().optional().describe("The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved."),
  publishedAfter: z.string().optional(),
  publishedBefore: z.string().optional(),
  regionCode: z.string().optional(),
})

export const YoutubeActivitiesListOutput = z.object({
  etag: z.string().optional().describe("Etag of this resource."),
  eventId: z.string().optional().describe("Serialized EventId of the request which produced this response."),
  items: z.array(z.object({
    contentDetails: z.object({
      bulletin: z.object({
        resourceId: z.object({
          channelId: z.string().optional().describe("The ID that YouTube uses to uniquely identify the referred resource, if that resource is a channel. This property is only present if the resourceId.kind value is youtube#channel."),
          kind: z.string().optional().describe("The type of the API resource."),
          playlistId: z.string().optional().describe("The ID that YouTube uses to uniquely identify the referred resource, if that resource is a playlist. This property is only present if the resourceId.kind value is youtube#playlist."),
          videoId: z.string().optional().describe("The ID that YouTube uses to uniquely identify the referred resource, if that resource is a video. This property is only present if the resourceId.kind value is youtube#video."),
        }).optional().describe("The resourceId object contains information that identifies the resource associated with a bulletin post. @mutable youtube.activities.insert"),
      }).optional().describe("The bulletin object contains details about a channel bulletin post. This object is only present if the snippet.type is bulletin."),
      channelItem: z.object({
        resourceId: z.object({
          channelId: z.string().optional().describe("The ID that YouTube uses to uniquely identify the referred resource, if that resource is a channel. This property is only present if the resourceId.kind value is youtube#channel."),
          kind: z.string().optional().describe("The type of the API resource."),
          playlistId: z.string().optional().describe("The ID that YouTube uses to uniquely identify the referred resource, if that resource is a playlist. This property is only present if the resourceId.kind value is youtube#playlist."),
          videoId: z.string().optional().describe("The ID that YouTube uses to uniquely identify the referred resource, if that resource is a video. This property is only present if the resourceId.kind value is youtube#video."),
        }).optional().describe("The resourceId object contains information that identifies the resource that was added to the channel."),
      }).optional().describe("The channelItem object contains details about a resource which was added to a channel. This property is only present if the snippet.type is channelItem."),
      comment: z.object({
        resourceId: z.object({
          channelId: z.string().optional().describe("The ID that YouTube uses to uniquely identify the referred resource, if that resource is a channel. This property is only present if the resourceId.kind value is youtube#channel."),
          kind: z.string().optional().describe("The type of the API resource."),
          playlistId: z.string().optional().describe("The ID that YouTube uses to uniquely identify the referred resource, if that resource is a playlist. This property is only present if the resourceId.kind value is youtube#playlist."),
          videoId: z.string().optional().describe("The ID that YouTube uses to uniquely identify the referred resource, if that resource is a video. This property is only present if the resourceId.kind value is youtube#video."),
        }).optional().describe("The resourceId object contains information that identifies the resource associated with the comment."),
      }).optional().describe("The comment object contains information about a resource that received a comment. This property is only present if the snippet.type is comment."),
      favorite: z.object({
        resourceId: z.object({
          channelId: z.string().optional().describe("The ID that YouTube uses to uniquely identify the referred resource, if that resource is a channel. This property is only present if the resourceId.kind value is youtube#channel."),
          kind: z.string().optional().describe("The type of the API resource."),
          playlistId: z.string().optional().describe("The ID that YouTube uses to uniquely identify the referred resource, if that resource is a playlist. This property is only present if the resourceId.kind value is youtube#playlist."),
          videoId: z.string().optional().describe("The ID that YouTube uses to uniquely identify the referred resource, if that resource is a video. This property is only present if the resourceId.kind value is youtube#video."),
        }).optional().describe("The resourceId object contains information that identifies the resource that was marked as a favorite."),
      }).optional().describe("The favorite object contains information about a video that was marked as a favorite video. This property is only present if the snippet.type is favorite."),
      like: z.object({
        resourceId: z.object({
          channelId: z.string().optional().describe("The ID that YouTube uses to uniquely identify the referred resource, if that resource is a channel. This property is only present if the resourceId.kind value is youtube#channel."),
          kind: z.string().optional().describe("The type of the API resource."),
          playlistId: z.string().optional().describe("The ID that YouTube uses to uniquely identify the referred resource, if that resource is a playlist. This property is only present if the resourceId.kind value is youtube#playlist."),
          videoId: z.string().optional().describe("The ID that YouTube uses to uniquely identify the referred resource, if that resource is a video. This property is only present if the resourceId.kind value is youtube#video."),
        }).optional().describe("The resourceId object contains information that identifies the rated resource."),
      }).optional().describe("The like object contains information about a resource that received a positive (like) rating. This property is only present if the snippet.type is like."),
      playlistItem: z.object({
        playlistId: z.string().optional().describe("The value that YouTube uses to uniquely identify the playlist."),
        playlistItemId: z.string().optional().describe("ID of the item within the playlist."),
        resourceId: z.object({
          channelId: z.string().optional().describe("The ID that YouTube uses to uniquely identify the referred resource, if that resource is a channel. This property is only present if the resourceId.kind value is youtube#channel."),
          kind: z.string().optional().describe("The type of the API resource."),
          playlistId: z.string().optional().describe("The ID that YouTube uses to uniquely identify the referred resource, if that resource is a playlist. This property is only present if the resourceId.kind value is youtube#playlist."),
          videoId: z.string().optional().describe("The ID that YouTube uses to uniquely identify the referred resource, if that resource is a video. This property is only present if the resourceId.kind value is youtube#video."),
        }).optional().describe("The resourceId object contains information about the resource that was added to the playlist."),
      }).optional().describe("The playlistItem object contains information about a new playlist item. This property is only present if the snippet.type is playlistItem."),
      promotedItem: z.object({
        adTag: z.string().optional().describe("The URL the client should fetch to request a promoted item."),
        clickTrackingUrl: z.string().optional().describe("The URL the client should ping to indicate that the user clicked through on this promoted item."),
        creativeViewUrl: z.string().optional().describe("The URL the client should ping to indicate that the user was shown this promoted item."),
        ctaType: z.enum(["ctaTypeUnspecified", "visitAdvertiserSite"]).optional().describe("The type of call-to-action, a message to the user indicating action that can be taken."),
        customCtaButtonText: z.string().optional().describe("The custom call-to-action button text. If specified, it will override the default button text for the cta_type."),
        descriptionText: z.string().optional().describe("The text description to accompany the promoted item."),
        destinationUrl: z.string().optional().describe("The URL the client should direct the user to, if the user chooses to visit the advertiser's website."),
        forecastingUrl: z.array(z.string()).optional().describe("The list of forecasting URLs. The client should ping all of these URLs when a promoted item is not available, to indicate that a promoted item could have been shown."),
        impressionUrl: z.array(z.string()).optional().describe("The list of impression URLs. The client should ping all of these URLs to indicate that the user was shown this promoted item."),
        videoId: z.string().optional().describe("The ID that YouTube uses to uniquely identify the promoted video."),
      }).optional().describe("The promotedItem object contains details about a resource which is being promoted. This property is only present if the snippet.type is promotedItem."),
      recommendation: z.object({
        reason: z.enum(["reasonUnspecified", "videoFavorited", "videoLiked", "videoWatched"]).optional().describe("The reason that the resource is recommended to the user."),
        resourceId: z.object({
          channelId: z.string().optional().describe("The ID that YouTube uses to uniquely identify the referred resource, if that resource is a channel. This property is only present if the resourceId.kind value is youtube#channel."),
          kind: z.string().optional().describe("The type of the API resource."),
          playlistId: z.string().optional().describe("The ID that YouTube uses to uniquely identify the referred resource, if that resource is a playlist. This property is only present if the resourceId.kind value is youtube#playlist."),
          videoId: z.string().optional().describe("The ID that YouTube uses to uniquely identify the referred resource, if that resource is a video. This property is only present if the resourceId.kind value is youtube#video."),
        }).optional().describe("The resourceId object contains information that identifies the recommended resource."),
        seedResourceId: z.object({
          channelId: z.string().optional().describe("The ID that YouTube uses to uniquely identify the referred resource, if that resource is a channel. This property is only present if the resourceId.kind value is youtube#channel."),
          kind: z.string().optional().describe("The type of the API resource."),
          playlistId: z.string().optional().describe("The ID that YouTube uses to uniquely identify the referred resource, if that resource is a playlist. This property is only present if the resourceId.kind value is youtube#playlist."),
          videoId: z.string().optional().describe("The ID that YouTube uses to uniquely identify the referred resource, if that resource is a video. This property is only present if the resourceId.kind value is youtube#video."),
        }).optional().describe("The seedResourceId object contains information about the resource that caused the recommendation."),
      }).optional().describe("The recommendation object contains information about a recommended resource. This property is only present if the snippet.type is recommendation."),
      social: z.object({
        author: z.string().optional().describe("The author of the social network post."),
        imageUrl: z.string().optional().describe("An image of the post's author."),
        referenceUrl: z.string().optional().describe("The URL of the social network post."),
        resourceId: z.object({
          channelId: z.string().optional().describe("The ID that YouTube uses to uniquely identify the referred resource, if that resource is a channel. This property is only present if the resourceId.kind value is youtube#channel."),
          kind: z.string().optional().describe("The type of the API resource."),
          playlistId: z.string().optional().describe("The ID that YouTube uses to uniquely identify the referred resource, if that resource is a playlist. This property is only present if the resourceId.kind value is youtube#playlist."),
          videoId: z.string().optional().describe("The ID that YouTube uses to uniquely identify the referred resource, if that resource is a video. This property is only present if the resourceId.kind value is youtube#video."),
        }).optional().describe("The resourceId object encapsulates information that identifies the resource associated with a social network post."),
        type: z.enum(["unspecified", "googlePlus", "facebook", "twitter"]).optional().describe("The name of the social network."),
      }).optional().describe("The social object contains details about a social network post. This property is only present if the snippet.type is social."),
      subscription: z.object({
        resourceId: z.object({
          channelId: z.string().optional().describe("The ID that YouTube uses to uniquely identify the referred resource, if that resource is a channel. This property is only present if the resourceId.kind value is youtube#channel."),
          kind: z.string().optional().describe("The type of the API resource."),
          playlistId: z.string().optional().describe("The ID that YouTube uses to uniquely identify the referred resource, if that resource is a playlist. This property is only present if the resourceId.kind value is youtube#playlist."),
          videoId: z.string().optional().describe("The ID that YouTube uses to uniquely identify the referred resource, if that resource is a video. This property is only present if the resourceId.kind value is youtube#video."),
        }).optional().describe("The resourceId object contains information that identifies the resource that the user subscribed to."),
      }).optional().describe("The subscription object contains information about a channel that a user subscribed to. This property is only present if the snippet.type is subscription."),
      upload: z.object({
        videoId: z.string().optional().describe("The ID that YouTube uses to uniquely identify the uploaded video."),
      }).optional().describe("The upload object contains information about the uploaded video. This property is only present if the snippet.type is upload."),
    }).optional().describe("The contentDetails object contains information about the content associated with the activity. For example, if the snippet.type value is videoRated, then the contentDetails object's content identifies the rated video."),
    etag: z.string().optional().describe("Etag of this resource"),
    id: z.string().optional().describe("The ID that YouTube uses to uniquely identify the activity."),
    kind: z.string().optional().default("youtube#activity").describe("Identifies what kind of resource this is. Value: the fixed string \"youtube#activity\"."),
    snippet: z.object({
      channelId: z.string().optional().describe("The ID that YouTube uses to uniquely identify the channel associated with the activity."),
      channelTitle: z.string().optional().describe("Channel title for the channel responsible for this activity"),
      description: z.string().optional().describe("The description of the resource primarily associated with the activity. @mutable youtube.activities.insert"),
      groupId: z.string().optional().describe("The group ID associated with the activity. A group ID identifies user events that are associated with the same user and resource. For example, if a user rates a video and marks the same video as a favorite, the entries for those events would have the same group ID in the user's activity feed. In your user interface, you can avoid repetition by grouping events with the same groupId value."),
      publishedAt: z.string().datetime().optional().describe("The date and time that the video was uploaded."),
      thumbnails: z.object({
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
      }).optional().describe("A map of thumbnail images associated with the resource that is primarily associated with the activity. For each object in the map, the key is the name of the thumbnail image, and the value is an object that contains other information about the thumbnail."),
      title: z.string().optional().describe("The title of the resource primarily associated with the activity."),
      type: z.enum(["typeUnspecified", "upload", "like", "favorite", "comment", "subscription", "playlistItem", "recommendation", "bulletin", "social", "channelItem", "promotedItem"]).optional().describe("The type of activity that the resource describes."),
    }).optional().describe("The snippet object contains basic details about the activity, including the activity's type and group ID."),
  })).optional(),
  kind: z.string().optional().default("youtube#activityListResponse").describe("Identifies what kind of resource this is. Value: the fixed string \"youtube#activityListResponse\"."),
  nextPageToken: z.string().optional().describe("The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set."),
  pageInfo: z.object({
    resultsPerPage: z.number().int().optional().describe("The number of results included in the API response."),
    totalResults: z.number().int().optional().describe("The total number of results in the result set."),
  }).optional().describe("General pagination information."),
  prevPageToken: z.string().optional().describe("The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set."),
  tokenPagination: z.record(z.string(), z.unknown()).optional().describe("Stub token pagination template to suppress results."),
  visitorId: z.string().optional().describe("The visitorId identifies the visitor."),
})

export const youtubeActivitiesList = pikkuSessionlessFunc({
  description: "Retrieves a list of resources, possibly filtered.",
  input: YoutubeActivitiesListInput,
  output: YoutubeActivitiesListOutput,
  func: async ({ youtube }, data) => {
    return youtube.call("GET", "/youtube/v3/activities", data) as any
  },
})
