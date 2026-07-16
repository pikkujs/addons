import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, TooManyRequestsError } from '@pikku/core/errors'

export const GetAnArtistsTopTracksInput = z.object({
  id: z.string().describe("The [Spotify ID](/documentation/web-api/#spotify-uris-and-ids) of the artist.\n"),
  market: z.string().optional().describe("An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/se/account/overview/).\n"),
})

export const GetAnArtistsTopTracksOutput = z.object({
  tracks: z.array(z.object({
    album: z.unknown().optional().describe("The album on which the track appears. The album object includes a link in `href` to full information about the album.\n"),
    artists: z.array(z.object({
      external_urls: z.object({
        spotify: z.string().optional().describe("The [Spotify URL](/documentation/web-api/#spotify-uris-and-ids) for the object.\n"),
      }).optional().describe("Known external URLs for this artist.\n"),
      followers: z.object({
        href: z.string().nullable().optional().describe("This will always be set to null, as the Web API does not support it at the moment.\n"),
        total: z.number().int().optional().describe("The total number of followers.\n"),
      }).optional().describe("Information about the followers of the artist.\n"),
      genres: z.array(z.string()).optional().describe("A list of the genres the artist is associated with. If not yet classified, the array is empty.\n"),
      href: z.string().optional().describe("A link to the Web API endpoint providing full details of the artist.\n"),
      id: z.string().optional().describe("The [Spotify ID](/documentation/web-api/#spotify-uris-and-ids) for the artist.\n"),
      images: z.array(z.object({
        height: z.number().int().nullable().describe("The image height in pixels.\n"),
        url: z.string().describe("The source URL of the image.\n"),
        width: z.number().int().nullable().describe("The image width in pixels.\n"),
      })).optional().describe("Images of the artist in various sizes, widest first.\n"),
      name: z.string().optional().describe("The name of the artist.\n"),
      popularity: z.number().int().optional().describe("The popularity of the artist. The value will be between 0 and 100, with 100 being the most popular. The artist's popularity is calculated from the popularity of all the artist's tracks.\n"),
      type: z.literal("artist").optional().describe("The object type.\n"),
      uri: z.string().optional().describe("The [Spotify URI](/documentation/web-api/#spotify-uris-and-ids) for the artist.\n"),
    })).optional().describe("The artists who performed the track. Each artist object includes a link in `href` to more detailed information about the artist.\n"),
    available_markets: z.array(z.string()).optional().describe("A list of the countries in which the track can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.\n"),
    disc_number: z.number().int().optional().describe("The disc number (usually `1` unless the album consists of more than one disc).\n"),
    duration_ms: z.number().int().optional().describe("The track length in milliseconds.\n"),
    explicit: z.boolean().optional().describe("Whether or not the track has explicit lyrics ( `true` = yes it does; `false` = no it does not OR unknown).\n"),
    external_ids: z.object({
      ean: z.string().optional().describe("[International Article Number](http://en.wikipedia.org/wiki/International_Article_Number_%28EAN%29)\n"),
      isrc: z.string().optional().describe("[International Standard Recording Code](http://en.wikipedia.org/wiki/International_Standard_Recording_Code)\n"),
      upc: z.string().optional().describe("[Universal Product Code](http://en.wikipedia.org/wiki/Universal_Product_Code)\n"),
    }).optional().describe("Known external IDs for the track.\n"),
    external_urls: z.object({
      spotify: z.string().optional().describe("The [Spotify URL](/documentation/web-api/#spotify-uris-and-ids) for the object.\n"),
    }).optional().describe("Known external URLs for this track.\n"),
    href: z.string().optional().describe("A link to the Web API endpoint providing full details of the track.\n"),
    id: z.string().optional().describe("The [Spotify ID](/documentation/web-api/#spotify-uris-and-ids) for the track.\n"),
    is_local: z.boolean().optional().describe("Whether or not the track is from a local file.\n"),
    is_playable: z.boolean().optional().describe("Part of the response when [Track Relinking](/documentation/general/guides/track-relinking-guide/) is applied. If `true`, the track is playable in the given market. Otherwise `false`.\n"),
    linked_from: z.object({
      external_urls: z.object({
        spotify: z.string().optional().describe("The [Spotify URL](/documentation/web-api/#spotify-uris-and-ids) for the object.\n"),
      }).optional().describe("Known external URLs for this track.\n"),
      href: z.string().optional().describe("A link to the Web API endpoint providing full details of the track.\n"),
      id: z.string().optional().describe("The [Spotify ID](/documentation/web-api/#spotify-uris-and-ids) for the track.\n"),
      type: z.string().optional().describe("The object type: \"track\".\n"),
      uri: z.string().optional().describe("The [Spotify URI](/documentation/web-api/#spotify-uris-and-ids) for the track.\n"),
    }).optional().describe("Part of the response when [Track Relinking](/documentation/general/guides/track-relinking-guide/) is applied and is only part of the response if the track linking, in fact, exists. The requested track has been replaced with a different track. The track in the `linked_from` object contains information about the originally requested track."),
    name: z.string().optional().describe("The name of the track.\n"),
    popularity: z.number().int().optional().describe("The popularity of the track. The value will be between 0 and 100, with 100 being the most popular.<br/>The popularity of a track is a value between 0 and 100, with 100 being the most popular. The popularity is calculated by algorithm and is based, in the most part, on the total number of plays the track has had and how recent those plays are.<br/>Generally speaking, songs that are being played a lot now will have a higher popularity than songs that were played a lot in the past. Duplicate tracks (e.g. the same track from a single and an album) are rated independently. Artist and album popularity is derived mathematically from track popularity. _**Note**: the popularity value may lag actual popularity by a few days: the value is not updated in real time._\n"),
    preview_url: z.string().optional().describe("A link to a 30 second preview (MP3 format) of the track. Can be `null`\n"),
    restrictions: z.object({
      reason: z.string().optional().describe("The reason for the restriction. Supported values:\n- `market` - The content item is not available in the given market.\n- `product` - The content item is not available for the user's subscription type.\n- `explicit` - The content item is explicit and the user's account is set to not play explicit content.\n\nAdditional reasons may be added in the future.\n**Note**: If you use this field, make sure that your application safely handles unknown values.\n"),
    }).optional().describe("Included in the response when a content restriction is applied.\n"),
    track_number: z.number().int().optional().describe("The number of the track. If an album has several discs, the track number is the number on the specified disc.\n"),
    type: z.literal("track").optional().describe("The object type: \"track\".\n"),
    uri: z.string().optional().describe("The [Spotify URI](/documentation/web-api/#spotify-uris-and-ids) for the track.\n"),
  })),
})

export const getAnArtistsTopTracks = pikkuSessionlessFunc({
  description: "Get Spotify catalog information about an artist's top tracks by country.",
  input: GetAnArtistsTopTracksInput,
  output: GetAnArtistsTopTracksOutput,
  errors: [UnauthorizedError, ForbiddenError, TooManyRequestsError],
  func: async ({ spotify }, data) => {
    return spotify.call("GET", "/artists/{id}/top-tracks", data) as any
  },
})
