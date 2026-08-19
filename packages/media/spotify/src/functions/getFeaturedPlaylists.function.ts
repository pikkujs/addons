import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, TooManyRequestsError } from '@pikku/core/errors'

export const GetFeaturedPlaylistsInput = z.object({
  country: z.string().optional().describe("A country: an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). Provide this parameter if you want the list of returned items to be relevant to a particular country. If omitted, the returned items will be relevant to all countries.\n"),
  locale: z.string().optional().describe("The desired language, consisting of a lowercase [ISO 639-1 language code](http://en.wikipedia.org/wiki/ISO_639-1) and an uppercase [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), joined by an underscore. For example: `es_MX`, meaning \"Spanish (Mexico)\". Provide this parameter if you want the results returned in a particular language (where available). <br/>\n_**Note**: if `locale` is not supplied, or if the specified language is not available, all strings will be returned in the Spotify default language (American English). The `locale` parameter, combined with the `country` parameter, may give odd results if not carefully matched. For example `country=SE&locale=de_DE` will return a list of categories relevant to Sweden but as German language strings._\n"),
  timestamp: z.string().optional().describe("A timestamp in [ISO 8601 format](http://en.wikipedia.org/wiki/ISO_8601): `yyyy-MM-ddTHH:mm:ss`. Use this parameter to specify the user's local time to get results tailored for that specific date and time in the day. If not provided, the response defaults to the current UTC time. Example: \"2014-10-23T09:00:00\" for a user whose local time is 9AM. If there were no featured playlists (or there is no data) at the specified time, the response will revert to the current UTC time.\n"),
  limit: z.number().int().min(1).max(50).optional().default(20).describe("The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n"),
  offset: z.number().int().optional().default(0).describe("The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n"),
})

export const GetFeaturedPlaylistsOutput = z.object({
  message: z.string().optional(),
  playlists: z.object({
    href: z.string().describe("A link to the Web API endpoint returning the full result of the request\n"),
    limit: z.number().int().describe("The maximum number of items in the response (as set in the query or by default).\n"),
    next: z.string().nullable().describe("URL to the next page of items. ( `null` if none)\n"),
    offset: z.number().int().describe("The offset of the items returned (as set in the query or by default)\n"),
    previous: z.string().nullable().describe("URL to the previous page of items. ( `null` if none)\n"),
    total: z.number().int().describe("The total number of items available to return.\n"),
    items: z.array(z.object({
      collaborative: z.boolean().optional().describe("`true` if the owner allows other users to modify the playlist.\n"),
      description: z.string().optional().describe("The playlist description. _Only returned for modified, verified playlists, otherwise_ `null`.\n"),
      external_urls: z.object({
        spotify: z.string().optional().describe("The [Spotify URL](/documentation/web-api/#spotify-uris-and-ids) for the object.\n"),
      }).optional().describe("Known external URLs for this playlist.\n"),
      href: z.string().optional().describe("A link to the Web API endpoint providing full details of the playlist.\n"),
      id: z.string().optional().describe("The [Spotify ID](/documentation/web-api/#spotify-uris-and-ids) for the playlist.\n"),
      images: z.array(z.object({
        height: z.number().int().nullable().describe("The image height in pixels.\n"),
        url: z.string().describe("The source URL of the image.\n"),
        width: z.number().int().nullable().describe("The image width in pixels.\n"),
      })).optional().describe("Images for the playlist. The array may be empty or contain up to three images. The images are returned by size in descending order. See [Working with Playlists](/documentation/general/guides/working-with-playlists/). _**Note**: If returned, the source URL for the image (`url`) is temporary and will expire in less than a day._\n"),
      name: z.string().optional().describe("The name of the playlist.\n"),
      owner: z.unknown().optional().describe("The user who owns the playlist\n"),
      public: z.boolean().optional().describe("The playlist's public/private status: `true` the playlist is public, `false` the playlist is private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/general/guides/working-with-playlists/)\n"),
      snapshot_id: z.string().optional().describe("The version identifier for the current playlist. Can be supplied in other requests to target a specific playlist version\n"),
      tracks: z.object({
        href: z.string().optional().describe("A link to the Web API endpoint where full details of the playlist's tracks can be retrieved.\n"),
        total: z.number().int().optional().describe("Number of tracks in the playlist.\n"),
      }).optional().describe("A collection containing a link ( `href` ) to the Web API endpoint where full details of the playlist's tracks can be retrieved, along with the `total` number of tracks in the playlist. Note, a track object may be `null`. This can happen if a track is no longer available.\n"),
      type: z.string().optional().describe("The object type: \"playlist\"\n"),
      uri: z.string().optional().describe("The [Spotify URI](/documentation/web-api/#spotify-uris-and-ids) for the playlist.\n"),
    })),
  }).optional(),
})

export const getFeaturedPlaylists = pikkuSessionlessFunc({
  description: "Get a list of Spotify featured playlists (shown, for example, on a Spotify player's 'Browse' tab).",
  input: GetFeaturedPlaylistsInput,
  output: GetFeaturedPlaylistsOutput,
  errors: [UnauthorizedError, ForbiddenError, TooManyRequestsError],
  func: async ({ spotify }, data) => {
    return spotify.call("GET", "/browse/featured-playlists", data) as any
  },
})
