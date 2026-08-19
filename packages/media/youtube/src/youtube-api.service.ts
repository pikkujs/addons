import { BadRequestError, ConflictError, ForbiddenError, InternalServerError, MethodNotAllowedError, NotFoundError, TooManyRequestsError, UnauthorizedError, UnprocessableContentError } from '@pikku/core/errors'
import type { TypedVariablesService } from '#pikku/addon/variables/pikku-variables.gen.js'

export const YOUTUBE_OAUTH2_CONFIG = {
  tokenSecretId: 'YOUTUBE_TOKENS',
  authorizationUrl: "https://accounts.google.com/o/oauth2/auth",
  tokenUrl: "https://example.com/oauth2/token",
  scopes: ["https://www.googleapis.com/auth/youtube","https://www.googleapis.com/auth/youtube.channel-memberships.creator","https://www.googleapis.com/auth/youtube.force-ssl","https://www.googleapis.com/auth/youtube.readonly","https://www.googleapis.com/auth/youtube.upload","https://www.googleapis.com/auth/youtubepartner","https://www.googleapis.com/auth/youtubepartner-channel-audit"],
}

const ROUTES: Record<string, { path: string[], query: string[], headers: string[], errors?: Record<number, string> }> = {
  "POST /youtube/v3/abuseReports": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part"
    ],
    "headers": []
  },
  "GET /youtube/v3/activities": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "channelId",
      "home",
      "maxResults",
      "mine",
      "pageToken",
      "publishedAfter",
      "publishedBefore",
      "regionCode"
    ],
    "headers": []
  },
  "GET /youtube/v3/captions": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "videoId",
      "id",
      "onBehalfOf",
      "onBehalfOfContentOwner"
    ],
    "headers": []
  },
  "POST /youtube/v3/captions": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "onBehalfOf",
      "onBehalfOfContentOwner",
      "sync"
    ],
    "headers": []
  },
  "PUT /youtube/v3/captions": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "onBehalfOf",
      "onBehalfOfContentOwner",
      "sync"
    ],
    "headers": []
  },
  "DELETE /youtube/v3/captions": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "id",
      "onBehalfOf",
      "onBehalfOfContentOwner"
    ],
    "headers": []
  },
  "GET /youtube/v3/captions/{id}": {
    "path": [
      "id"
    ],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "onBehalfOf",
      "onBehalfOfContentOwner",
      "tfmt",
      "tlang"
    ],
    "headers": []
  },
  "POST /youtube/v3/channelBanners/insert": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "channelId",
      "onBehalfOfContentOwner",
      "onBehalfOfContentOwnerChannel"
    ],
    "headers": []
  },
  "GET /youtube/v3/channelSections": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "channelId",
      "hl",
      "id",
      "mine",
      "onBehalfOfContentOwner"
    ],
    "headers": []
  },
  "POST /youtube/v3/channelSections": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "onBehalfOfContentOwner",
      "onBehalfOfContentOwnerChannel"
    ],
    "headers": []
  },
  "PUT /youtube/v3/channelSections": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "onBehalfOfContentOwner"
    ],
    "headers": []
  },
  "DELETE /youtube/v3/channelSections": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "id",
      "onBehalfOfContentOwner"
    ],
    "headers": []
  },
  "GET /youtube/v3/channels": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "categoryId",
      "forUsername",
      "hl",
      "id",
      "managedByMe",
      "maxResults",
      "mine",
      "mySubscribers",
      "onBehalfOfContentOwner",
      "pageToken"
    ],
    "headers": []
  },
  "PUT /youtube/v3/channels": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "onBehalfOfContentOwner"
    ],
    "headers": []
  },
  "GET /youtube/v3/commentThreads": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "allThreadsRelatedToChannelId",
      "channelId",
      "id",
      "maxResults",
      "moderationStatus",
      "order",
      "pageToken",
      "searchTerms",
      "textFormat",
      "videoId"
    ],
    "headers": []
  },
  "POST /youtube/v3/commentThreads": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part"
    ],
    "headers": []
  },
  "PUT /youtube/v3/commentThreads": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part"
    ],
    "headers": []
  },
  "GET /youtube/v3/comments": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "id",
      "maxResults",
      "pageToken",
      "parentId",
      "textFormat"
    ],
    "headers": []
  },
  "POST /youtube/v3/comments": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part"
    ],
    "headers": []
  },
  "PUT /youtube/v3/comments": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part"
    ],
    "headers": []
  },
  "DELETE /youtube/v3/comments": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "id"
    ],
    "headers": []
  },
  "POST /youtube/v3/comments/markAsSpam": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "id"
    ],
    "headers": []
  },
  "POST /youtube/v3/comments/setModerationStatus": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "id",
      "moderationStatus",
      "banAuthor"
    ],
    "headers": []
  },
  "GET /youtube/v3/i18nLanguages": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "hl"
    ],
    "headers": []
  },
  "GET /youtube/v3/i18nRegions": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "hl"
    ],
    "headers": []
  },
  "GET /youtube/v3/liveBroadcasts": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "broadcastStatus",
      "broadcastType",
      "id",
      "maxResults",
      "mine",
      "onBehalfOfContentOwner",
      "onBehalfOfContentOwnerChannel",
      "pageToken"
    ],
    "headers": []
  },
  "POST /youtube/v3/liveBroadcasts": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "onBehalfOfContentOwner",
      "onBehalfOfContentOwnerChannel"
    ],
    "headers": []
  },
  "PUT /youtube/v3/liveBroadcasts": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "onBehalfOfContentOwner",
      "onBehalfOfContentOwnerChannel"
    ],
    "headers": []
  },
  "DELETE /youtube/v3/liveBroadcasts": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "id",
      "onBehalfOfContentOwner",
      "onBehalfOfContentOwnerChannel"
    ],
    "headers": []
  },
  "POST /youtube/v3/liveBroadcasts/bind": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "id",
      "part",
      "onBehalfOfContentOwner",
      "onBehalfOfContentOwnerChannel",
      "streamId"
    ],
    "headers": []
  },
  "POST /youtube/v3/liveBroadcasts/cuepoint": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "id",
      "onBehalfOfContentOwner",
      "onBehalfOfContentOwnerChannel",
      "part"
    ],
    "headers": []
  },
  "POST /youtube/v3/liveBroadcasts/transition": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "broadcastStatus",
      "id",
      "part",
      "onBehalfOfContentOwner",
      "onBehalfOfContentOwnerChannel"
    ],
    "headers": []
  },
  "POST /youtube/v3/liveChat/bans": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part"
    ],
    "headers": []
  },
  "DELETE /youtube/v3/liveChat/bans": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "id"
    ],
    "headers": []
  },
  "GET /youtube/v3/liveChat/messages": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "liveChatId",
      "part",
      "hl",
      "maxResults",
      "pageToken",
      "profileImageSize"
    ],
    "headers": []
  },
  "POST /youtube/v3/liveChat/messages": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part"
    ],
    "headers": []
  },
  "DELETE /youtube/v3/liveChat/messages": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "id"
    ],
    "headers": []
  },
  "GET /youtube/v3/liveChat/moderators": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "liveChatId",
      "part",
      "maxResults",
      "pageToken"
    ],
    "headers": []
  },
  "POST /youtube/v3/liveChat/moderators": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part"
    ],
    "headers": []
  },
  "DELETE /youtube/v3/liveChat/moderators": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "id"
    ],
    "headers": []
  },
  "GET /youtube/v3/liveStreams": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "id",
      "maxResults",
      "mine",
      "onBehalfOfContentOwner",
      "onBehalfOfContentOwnerChannel",
      "pageToken"
    ],
    "headers": []
  },
  "POST /youtube/v3/liveStreams": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "onBehalfOfContentOwner",
      "onBehalfOfContentOwnerChannel"
    ],
    "headers": []
  },
  "PUT /youtube/v3/liveStreams": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "onBehalfOfContentOwner",
      "onBehalfOfContentOwnerChannel"
    ],
    "headers": []
  },
  "DELETE /youtube/v3/liveStreams": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "id",
      "onBehalfOfContentOwner",
      "onBehalfOfContentOwnerChannel"
    ],
    "headers": []
  },
  "GET /youtube/v3/members": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "filterByMemberChannelId",
      "hasAccessToLevel",
      "maxResults",
      "mode",
      "pageToken"
    ],
    "headers": []
  },
  "GET /youtube/v3/membershipsLevels": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part"
    ],
    "headers": []
  },
  "GET /youtube/v3/playlistItems": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "id",
      "maxResults",
      "onBehalfOfContentOwner",
      "pageToken",
      "playlistId",
      "videoId"
    ],
    "headers": []
  },
  "POST /youtube/v3/playlistItems": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "onBehalfOfContentOwner"
    ],
    "headers": []
  },
  "PUT /youtube/v3/playlistItems": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "onBehalfOfContentOwner"
    ],
    "headers": []
  },
  "DELETE /youtube/v3/playlistItems": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "id",
      "onBehalfOfContentOwner"
    ],
    "headers": []
  },
  "GET /youtube/v3/playlists": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "channelId",
      "hl",
      "id",
      "maxResults",
      "mine",
      "onBehalfOfContentOwner",
      "onBehalfOfContentOwnerChannel",
      "pageToken"
    ],
    "headers": []
  },
  "POST /youtube/v3/playlists": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "onBehalfOfContentOwner",
      "onBehalfOfContentOwnerChannel"
    ],
    "headers": []
  },
  "PUT /youtube/v3/playlists": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "onBehalfOfContentOwner"
    ],
    "headers": []
  },
  "DELETE /youtube/v3/playlists": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "id",
      "onBehalfOfContentOwner"
    ],
    "headers": []
  },
  "GET /youtube/v3/search": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "channelId",
      "channelType",
      "eventType",
      "forContentOwner",
      "forDeveloper",
      "forMine",
      "location",
      "locationRadius",
      "maxResults",
      "onBehalfOfContentOwner",
      "order",
      "pageToken",
      "publishedAfter",
      "publishedBefore",
      "q",
      "regionCode",
      "relatedToVideoId",
      "relevanceLanguage",
      "safeSearch",
      "topicId",
      "type",
      "videoCaption",
      "videoCategoryId",
      "videoDefinition",
      "videoDimension",
      "videoDuration",
      "videoEmbeddable",
      "videoLicense",
      "videoSyndicated",
      "videoType"
    ],
    "headers": []
  },
  "GET /youtube/v3/subscriptions": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "channelId",
      "forChannelId",
      "id",
      "maxResults",
      "mine",
      "myRecentSubscribers",
      "mySubscribers",
      "onBehalfOfContentOwner",
      "onBehalfOfContentOwnerChannel",
      "order",
      "pageToken"
    ],
    "headers": []
  },
  "POST /youtube/v3/subscriptions": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part"
    ],
    "headers": []
  },
  "DELETE /youtube/v3/subscriptions": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "id"
    ],
    "headers": []
  },
  "GET /youtube/v3/superChatEvents": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "hl",
      "maxResults",
      "pageToken"
    ],
    "headers": []
  },
  "POST /youtube/v3/tests": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "externalChannelId"
    ],
    "headers": []
  },
  "GET /youtube/v3/thirdPartyLinks": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "externalChannelId",
      "linkingToken",
      "type"
    ],
    "headers": []
  },
  "POST /youtube/v3/thirdPartyLinks": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "externalChannelId"
    ],
    "headers": []
  },
  "PUT /youtube/v3/thirdPartyLinks": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "externalChannelId"
    ],
    "headers": []
  },
  "DELETE /youtube/v3/thirdPartyLinks": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "linkingToken",
      "type",
      "externalChannelId",
      "part"
    ],
    "headers": []
  },
  "POST /youtube/v3/thumbnails/set": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "videoId",
      "onBehalfOfContentOwner"
    ],
    "headers": []
  },
  "GET /youtube/v3/videoAbuseReportReasons": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "hl"
    ],
    "headers": []
  },
  "GET /youtube/v3/videoCategories": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "hl",
      "id",
      "regionCode"
    ],
    "headers": []
  },
  "GET /youtube/v3/videos": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "chart",
      "hl",
      "id",
      "locale",
      "maxHeight",
      "maxResults",
      "maxWidth",
      "myRating",
      "onBehalfOfContentOwner",
      "pageToken",
      "regionCode",
      "videoCategoryId"
    ],
    "headers": []
  },
  "POST /youtube/v3/videos": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "autoLevels",
      "notifySubscribers",
      "onBehalfOfContentOwner",
      "onBehalfOfContentOwnerChannel",
      "stabilize"
    ],
    "headers": []
  },
  "PUT /youtube/v3/videos": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "part",
      "onBehalfOfContentOwner"
    ],
    "headers": []
  },
  "DELETE /youtube/v3/videos": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "id",
      "onBehalfOfContentOwner"
    ],
    "headers": []
  },
  "GET /youtube/v3/videos/getRating": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "id",
      "onBehalfOfContentOwner"
    ],
    "headers": []
  },
  "POST /youtube/v3/videos/rate": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "id",
      "rating"
    ],
    "headers": []
  },
  "POST /youtube/v3/videos/reportAbuse": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "onBehalfOfContentOwner"
    ],
    "headers": []
  },
  "POST /youtube/v3/watermarks/set": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "channelId",
      "onBehalfOfContentOwner"
    ],
    "headers": []
  },
  "POST /youtube/v3/watermarks/unset": {
    "path": [],
    "query": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "channelId",
      "onBehalfOfContentOwner"
    ],
    "headers": []
  }
}

export class YoutubeService {
  private baseUrl: string

  constructor(private creds: { accessToken: string }, variables: TypedVariablesService) {
    this.baseUrl = variables.get('YOUTUBE_BASE_URL') as string
  }

  async call<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    path: string,
    data?: Record<string, unknown>
  ): Promise<T> {
    const route = ROUTES[`${method} ${path}`]
    let endpoint = path
    let body: Record<string, unknown> | undefined
    const query: Record<string, string> = {}
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    if (data && route) {
      // Interpolate path params
      for (const param of route.path) {
        if (data[param] !== undefined) {
          endpoint = endpoint.replace(`{${param}}`, String(data[param]))
        }
      }
      // Extract query params
      for (const param of route.query) {
        if (data[param] !== undefined) {
          query[param] = String(data[param])
        }
      }
      // Extract header params
      for (const param of route.headers) {
        if (data[param] !== undefined) {
          headers[param] = String(data[param])
        }
      }
      // Everything else goes into body
      const pathQueryHeaders = new Set([...route.path, ...route.query, ...route.headers])
      const remaining = Object.fromEntries(
        Object.entries(data).filter(([k]) => !pathQueryHeaders.has(k))
      )
      if (Object.keys(remaining).length > 0) {
        body = remaining
      }
    }

    const url = new URL(`${this.baseUrl}${endpoint}`)
    for (const [key, value] of Object.entries(query)) {
      url.searchParams.set(key, value)
    }

    headers.Authorization = `Bearer ${this.creds.accessToken}`

    const response = await fetch(url.toString(), {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    })

    if (!response.ok) {
      const errorText = await response.text()
      const errorMessage = route?.errors?.[response.status] ?? errorText
      switch (response.status) {
        case 400: throw new BadRequestError(errorMessage)
        case 401: throw new UnauthorizedError(errorMessage)
        case 403: throw new ForbiddenError(errorMessage)
        case 404: throw new NotFoundError(errorMessage)
        case 405: throw new MethodNotAllowedError(errorMessage)
        case 409: throw new ConflictError(errorMessage)
        case 422: throw new UnprocessableContentError(errorMessage)
        case 429: throw new TooManyRequestsError(errorMessage)
        case 500: throw new InternalServerError(errorMessage)
        default: throw new Error(`YouTube API error (${response.status}): ${errorText}`)
      }
    }

    const text = await response.text()
    if (!text) return {} as T
    return JSON.parse(text) as T
  }
}
