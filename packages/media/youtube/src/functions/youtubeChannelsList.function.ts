import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const YoutubeChannelsListInput = z.object({
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
  part: z.array(z.string()).describe("The *part* parameter specifies a comma-separated list of one or more channel resource properties that the API response will include. If the parameter identifies a property that contains child properties, the child properties will be included in the response. For example, in a channel resource, the contentDetails property contains other properties, such as the uploads properties. As such, if you set *part=contentDetails*, the API response will also contain all of those nested properties."),
  categoryId: z.string().optional().describe("Return the channels within the specified guide category ID."),
  forUsername: z.string().optional().describe("Return the channel associated with a YouTube username."),
  hl: z.string().optional().describe("Stands for \"host language\". Specifies the localization language of the metadata to be filled into snippet.localized. The field is filled with the default metadata if there is no localization in the specified language. The parameter value must be a language code included in the list returned by the i18nLanguages.list method (e.g. en_US, es_MX)."),
  id: z.array(z.string()).optional().describe("Return the channels with the specified IDs."),
  managedByMe: z.boolean().optional().describe("Return the channels managed by the authenticated user."),
  maxResults: z.number().int().min(0).max(50).optional().describe("The *maxResults* parameter specifies the maximum number of items that should be returned in the result set."),
  mine: z.boolean().optional().describe("Return the ids of channels owned by the authenticated user."),
  mySubscribers: z.boolean().optional().describe("Return the channels subscribed to the authenticated user"),
  onBehalfOfContentOwner: z.string().optional().describe("*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner."),
  pageToken: z.string().optional().describe("The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved."),
})

export const YoutubeChannelsListOutput = z.object({
  etag: z.string().optional().describe("Etag of this resource."),
  eventId: z.string().optional().describe("Serialized EventId of the request which produced this response."),
  items: z.array(z.object({
    auditDetails: z.object({
      communityGuidelinesGoodStanding: z.boolean().optional().describe("Whether or not the channel respects the community guidelines."),
      contentIdClaimsGoodStanding: z.boolean().optional().describe("Whether or not the channel has any unresolved claims."),
      copyrightStrikesGoodStanding: z.boolean().optional().describe("Whether or not the channel has any copyright strikes."),
    }).optional().describe("The auditionDetails object encapsulates channel data that is relevant for YouTube Partners during the audition process."),
    brandingSettings: z.object({
      channel: z.object({
        country: z.string().optional().describe("The country of the channel."),
        defaultLanguage: z.string().optional(),
        defaultTab: z.string().optional().describe("Which content tab users should see when viewing the channel."),
        description: z.string().optional().describe("Specifies the channel description."),
        featuredChannelsTitle: z.string().optional().describe("Title for the featured channels tab."),
        featuredChannelsUrls: z.array(z.string()).optional().describe("The list of featured channels."),
        keywords: z.string().optional().describe("Lists keywords associated with the channel, comma-separated."),
        moderateComments: z.boolean().optional().describe("Whether user-submitted comments left on the channel page need to be approved by the channel owner to be publicly visible."),
        profileColor: z.string().optional().describe("A prominent color that can be rendered on this channel page."),
        showBrowseView: z.boolean().optional().describe("Whether the tab to browse the videos should be displayed."),
        showRelatedChannels: z.boolean().optional().describe("Whether related channels should be proposed."),
        title: z.string().optional().describe("Specifies the channel title."),
        trackingAnalyticsAccountId: z.string().optional().describe("The ID for a Google Analytics account to track and measure traffic to the channels."),
        unsubscribedTrailer: z.string().optional().describe("The trailer of the channel, for users that are not subscribers."),
      }).optional().describe("Branding properties for the channel view."),
      hints: z.array(z.object({
        property: z.string().optional().describe("A property."),
        value: z.string().optional().describe("The property's value."),
      })).optional().describe("Additional experimental branding properties."),
      image: z.object({
        backgroundImageUrl: z.object({
          defaultLanguage: z.object({
            value: z.string().optional(),
          }).optional().describe("The language of the default property."),
          localized: z.array(z.object({
            language: z.string().optional(),
            value: z.string().optional(),
          })).optional(),
        }).optional().describe("The URL for the background image shown on the video watch page. The image should be 1200px by 615px, with a maximum file size of 128k."),
        bannerExternalUrl: z.string().optional().describe("This is generated when a ChannelBanner.Insert request has succeeded for the given channel."),
        bannerImageUrl: z.string().optional().describe("Banner image. Desktop size (1060x175)."),
        bannerMobileExtraHdImageUrl: z.string().optional().describe("Banner image. Mobile size high resolution (1440x395)."),
        bannerMobileHdImageUrl: z.string().optional().describe("Banner image. Mobile size high resolution (1280x360)."),
        bannerMobileImageUrl: z.string().optional().describe("Banner image. Mobile size (640x175)."),
        bannerMobileLowImageUrl: z.string().optional().describe("Banner image. Mobile size low resolution (320x88)."),
        bannerMobileMediumHdImageUrl: z.string().optional().describe("Banner image. Mobile size medium/high resolution (960x263)."),
        bannerTabletExtraHdImageUrl: z.string().optional().describe("Banner image. Tablet size extra high resolution (2560x424)."),
        bannerTabletHdImageUrl: z.string().optional().describe("Banner image. Tablet size high resolution (2276x377)."),
        bannerTabletImageUrl: z.string().optional().describe("Banner image. Tablet size (1707x283)."),
        bannerTabletLowImageUrl: z.string().optional().describe("Banner image. Tablet size low resolution (1138x188)."),
        bannerTvHighImageUrl: z.string().optional().describe("Banner image. TV size high resolution (1920x1080)."),
        bannerTvImageUrl: z.string().optional().describe("Banner image. TV size extra high resolution (2120x1192)."),
        bannerTvLowImageUrl: z.string().optional().describe("Banner image. TV size low resolution (854x480)."),
        bannerTvMediumImageUrl: z.string().optional().describe("Banner image. TV size medium resolution (1280x720)."),
        largeBrandedBannerImageImapScript: z.object({
          defaultLanguage: z.object({
            value: z.string().optional(),
          }).optional().describe("The language of the default property."),
          localized: z.array(z.object({
            language: z.string().optional(),
            value: z.string().optional(),
          })).optional(),
        }).optional().describe("The image map script for the large banner image."),
        largeBrandedBannerImageUrl: z.object({
          defaultLanguage: z.object({
            value: z.string().optional(),
          }).optional().describe("The language of the default property."),
          localized: z.array(z.object({
            language: z.string().optional(),
            value: z.string().optional(),
          })).optional(),
        }).optional().describe("The URL for the 854px by 70px image that appears below the video player in the expanded video view of the video watch page."),
        smallBrandedBannerImageImapScript: z.object({
          defaultLanguage: z.object({
            value: z.string().optional(),
          }).optional().describe("The language of the default property."),
          localized: z.array(z.object({
            language: z.string().optional(),
            value: z.string().optional(),
          })).optional(),
        }).optional().describe("The image map script for the small banner image."),
        smallBrandedBannerImageUrl: z.object({
          defaultLanguage: z.object({
            value: z.string().optional(),
          }).optional().describe("The language of the default property."),
          localized: z.array(z.object({
            language: z.string().optional(),
            value: z.string().optional(),
          })).optional(),
        }).optional().describe("The URL for the 640px by 70px banner image that appears below the video player in the default view of the video watch page. The URL for the image that appears above the top-left corner of the video player. This is a 25-pixel-high image with a flexible width that cannot exceed 170 pixels."),
        trackingImageUrl: z.string().optional().describe("The URL for a 1px by 1px tracking pixel that can be used to collect statistics for views of the channel or video pages."),
        watchIconImageUrl: z.string().optional(),
      }).optional().describe("Branding properties for branding images."),
      watch: z.object({
        backgroundColor: z.string().optional().describe("The text color for the video watch page's branded area."),
        featuredPlaylistId: z.string().optional().describe("An ID that uniquely identifies a playlist that displays next to the video player."),
        textColor: z.string().optional().describe("The background color for the video watch page's branded area."),
      }).optional().describe("Branding properties for the watch page."),
    }).optional().describe("The brandingSettings object encapsulates information about the branding of the channel."),
    contentDetails: z.object({
      relatedPlaylists: z.object({
        favorites: z.string().optional().describe("The ID of the playlist that contains the channel\"s favorite videos. Use the playlistItems.insert and playlistItems.delete to add or remove items from that list."),
        likes: z.string().optional().describe("The ID of the playlist that contains the channel\"s liked videos. Use the playlistItems.insert and playlistItems.delete to add or remove items from that list."),
        uploads: z.string().optional().describe("The ID of the playlist that contains the channel\"s uploaded videos. Use the videos.insert method to upload new videos and the videos.delete method to delete previously uploaded videos."),
        watchHistory: z.string().optional().describe("The ID of the playlist that contains the channel\"s watch history. Use the playlistItems.insert and playlistItems.delete to add or remove items from that list."),
        watchLater: z.string().optional().describe("The ID of the playlist that contains the channel\"s watch later playlist. Use the playlistItems.insert and playlistItems.delete to add or remove items from that list."),
      }).optional(),
    }).optional().describe("The contentDetails object encapsulates information about the channel's content."),
    contentOwnerDetails: z.object({
      contentOwner: z.string().optional().describe("The ID of the content owner linked to the channel."),
      timeLinked: z.string().datetime().optional().describe("The date and time when the channel was linked to the content owner."),
    }).optional().describe("The contentOwnerDetails object encapsulates channel data that is relevant for YouTube Partners linked with the channel."),
    conversionPings: z.object({
      pings: z.array(z.object({
        context: z.enum(["subscribe", "unsubscribe", "cview"]).optional().describe("Defines the context of the ping."),
        conversionUrl: z.string().optional().describe("The url (without the schema) that the player shall send the ping to. It's at caller's descretion to decide which schema to use (http vs https) Example of a returned url: //googleads.g.doubleclick.net/pagead/ viewthroughconversion/962985656/?data=path%3DtHe_path%3Btype%3D cview%3Butuid%3DGISQtTNGYqaYl4sKxoVvKA&labe=default The caller must append biscotti authentication (ms param in case of mobile, for example) to this ping."),
      })).optional().describe("Pings that the app shall fire (authenticated by biscotti cookie). Each ping has a context, in which the app must fire the ping, and a url identifying the ping."),
    }).optional().describe("The conversionPings object encapsulates information about conversion pings that need to be respected by the channel."),
    etag: z.string().optional().describe("Etag of this resource."),
    id: z.string().optional().describe("The ID that YouTube uses to uniquely identify the channel."),
    kind: z.string().optional().default("youtube#channel").describe("Identifies what kind of resource this is. Value: the fixed string \"youtube#channel\"."),
    localizations: z.record(z.string(), z.object({
      description: z.string().optional().describe("The localized strings for channel's description."),
      title: z.string().optional().describe("The localized strings for channel's title."),
    }).describe("Channel localization setting")).optional().describe("Localizations for different languages"),
    snippet: z.object({
      country: z.string().optional().describe("The country of the channel."),
      customUrl: z.string().optional().describe("The custom url of the channel."),
      defaultLanguage: z.string().optional().describe("The language of the channel's default title and description."),
      description: z.string().optional().describe("The description of the channel."),
      localized: z.object({
        description: z.string().optional().describe("The localized strings for channel's description."),
        title: z.string().optional().describe("The localized strings for channel's title."),
      }).optional().describe("Localized title and description, read-only."),
      publishedAt: z.string().datetime().optional().describe("The date and time that the channel was created."),
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
      }).optional().describe("A map of thumbnail images associated with the channel. For each object in the map, the key is the name of the thumbnail image, and the value is an object that contains other information about the thumbnail. When displaying thumbnails in your application, make sure that your code uses the image URLs exactly as they are returned in API responses. For example, your application should not use the http domain instead of the https domain in a URL returned in an API response. Beginning in July 2018, channel thumbnail URLs will only be available in the https domain, which is how the URLs appear in API responses. After that time, you might see broken images in your application if it tries to load YouTube images from the http domain. Thumbnail images might be empty for newly created channels and might take up to one day to populate."),
      title: z.string().optional().describe("The channel's title."),
    }).optional().describe("The snippet object contains basic details about the channel, such as its title, description, and thumbnail images."),
    statistics: z.object({
      commentCount: z.string().optional().describe("The number of comments for the channel."),
      hiddenSubscriberCount: z.boolean().optional().describe("Whether or not the number of subscribers is shown for this user."),
      subscriberCount: z.string().optional().describe("The number of subscribers that the channel has."),
      videoCount: z.string().optional().describe("The number of videos uploaded to the channel."),
      viewCount: z.string().optional().describe("The number of times the channel has been viewed."),
    }).optional().describe("The statistics object encapsulates statistics for the channel."),
    status: z.object({
      isLinked: z.boolean().optional().describe("If true, then the user is linked to either a YouTube username or G+ account. Otherwise, the user doesn't have a public YouTube identity."),
      longUploadsStatus: z.enum(["longUploadsUnspecified", "allowed", "eligible", "disallowed"]).optional().describe("The long uploads status of this channel. See https://support.google.com/youtube/answer/71673 for more information."),
      madeForKids: z.boolean().optional(),
      privacyStatus: z.enum(["public", "unlisted", "private"]).optional().describe("Privacy status of the channel."),
      selfDeclaredMadeForKids: z.boolean().optional(),
    }).optional().describe("The status object encapsulates information about the privacy status of the channel."),
    topicDetails: z.object({
      topicCategories: z.array(z.string()).optional().describe("A list of Wikipedia URLs that describe the channel's content."),
      topicIds: z.array(z.string()).optional().describe("A list of Freebase topic IDs associated with the channel. You can retrieve information about each topic using the Freebase Topic API."),
    }).optional().describe("The topicDetails object encapsulates information about Freebase topics associated with the channel."),
  })).optional(),
  kind: z.string().optional().default("youtube#channelListResponse").describe("Identifies what kind of resource this is. Value: the fixed string \"youtube#channelListResponse\"."),
  nextPageToken: z.string().optional().describe("The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set."),
  pageInfo: z.object({
    resultsPerPage: z.number().int().optional().describe("The number of results included in the API response."),
    totalResults: z.number().int().optional().describe("The total number of results in the result set."),
  }).optional().describe("General pagination information."),
  prevPageToken: z.string().optional().describe("The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set."),
  tokenPagination: z.record(z.string(), z.unknown()).optional().describe("Stub token pagination template to suppress results."),
  visitorId: z.string().optional().describe("The visitorId identifies the visitor."),
})

export const youtubeChannelsList = pikkuSessionlessFunc({
  description: "Retrieves a list of resources, possibly filtered.",
  input: YoutubeChannelsListInput,
  output: YoutubeChannelsListOutput,
  func: async ({ youtube }, data) => {
    return youtube.call("GET", "/youtube/v3/channels", data) as any
  },
})
