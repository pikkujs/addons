import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, TooManyRequestsError } from '@pikku/core/errors'

export const GetAnAlbumsTracksInput = z.object({
  id: z.string().describe("The [Spotify ID](/documentation/web-api/#spotify-uris-and-ids) of the album.\n"),
  market: z.string().optional().describe("An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/se/account/overview/).\n"),
  limit: z.number().int().min(1).max(50).optional().default(20).describe("The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n"),
  offset: z.number().int().optional().default(0).describe("The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n"),
})

export const GetAnAlbumsTracksOutput = z.object({
  href: z.string().describe("A link to the Web API endpoint returning the full result of the request\n"),
  limit: z.number().int().describe("The maximum number of items in the response (as set in the query or by default).\n"),
  next: z.string().nullable().describe("URL to the next page of items. ( `null` if none)\n"),
  offset: z.number().int().describe("The offset of the items returned (as set in the query or by default)\n"),
  previous: z.string().nullable().describe("URL to the previous page of items. ( `null` if none)\n"),
  total: z.number().int().describe("The total number of items available to return.\n"),
  items: z.array(z.object({
    artists: z.array(z.object({
      external_urls: z.object({
        spotify: z.string().optional().describe("The [Spotify URL](/documentation/web-api/#spotify-uris-and-ids) for the object.\n"),
      }).optional().describe("Known external URLs for this artist.\n"),
      href: z.string().optional().describe("A link to the Web API endpoint providing full details of the artist.\n"),
      id: z.string().optional().describe("The [Spotify ID](/documentation/web-api/#spotify-uris-and-ids) for the artist.\n"),
      name: z.string().optional().describe("The name of the artist.\n"),
      type: z.literal("artist").optional().describe("The object type.\n"),
      uri: z.string().optional().describe("The [Spotify URI](/documentation/web-api/#spotify-uris-and-ids) for the artist.\n"),
    })).optional().describe("The artists who performed the track. Each artist object includes a link in `href` to more detailed information about the artist."),
    available_markets: z.array(z.string()).optional().describe("A list of the countries in which the track can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.\n"),
    disc_number: z.number().int().optional().describe("The disc number (usually `1` unless the album consists of more than one disc)."),
    duration_ms: z.number().int().optional().describe("The track length in milliseconds."),
    explicit: z.boolean().optional().describe("Whether or not the track has explicit lyrics ( `true` = yes it does; `false` = no it does not OR unknown)."),
    external_urls: z.object({
      spotify: z.string().optional().describe("The [Spotify URL](/documentation/web-api/#spotify-uris-and-ids) for the object.\n"),
    }).optional().describe("External URLs for this track.\n"),
    href: z.string().optional().describe("A link to the Web API endpoint providing full details of the track."),
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
    name: z.string().optional().describe("The name of the track."),
    preview_url: z.string().optional().describe("A URL to a 30 second preview (MP3 format) of the track.\n"),
    restrictions: z.object({
      reason: z.string().optional().describe("The reason for the restriction. Supported values:\n- `market` - The content item is not available in the given market.\n- `product` - The content item is not available for the user's subscription type.\n- `explicit` - The content item is explicit and the user's account is set to not play explicit content.\n\nAdditional reasons may be added in the future.\n**Note**: If you use this field, make sure that your application safely handles unknown values.\n"),
    }).optional().describe("Included in the response when a content restriction is applied.\n"),
    track_number: z.number().int().optional().describe("The number of the track. If an album has several discs, the track number is the number on the specified disc.\n"),
    type: z.string().optional().describe("The object type: \"track\".\n"),
    uri: z.string().optional().describe("The [Spotify URI](/documentation/web-api/#spotify-uris-and-ids) for the track.\n"),
  })),
})

export const getAnAlbumsTracks = pikkuSessionlessFunc({
  description: "Get Spotify catalog information about an album’s tracks.\nOptional parameters can be used to limit the number of tracks returned.",
  input: GetAnAlbumsTracksInput,
  output: GetAnAlbumsTracksOutput,
  errors: [UnauthorizedError, ForbiddenError, TooManyRequestsError],
  func: async ({ spotify }, data) => {
    return spotify.call("GET", "/albums/{id}/tracks", data) as any
  },
})
