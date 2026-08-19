import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, TooManyRequestsError } from '@pikku/core/errors'

export const GetAnAlbumInput = z.object({
  id: z.string().describe("The [Spotify ID](/documentation/web-api/#spotify-uris-and-ids) of the album.\n"),
  market: z.string().optional().describe("An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/se/account/overview/).\n"),
})

export const GetAnAlbumOutput = z.object({
  album_type: z.enum(["album", "single", "compilation"]).describe("The type of the album.\n"),
  available_markets: z.array(z.string()).describe("The markets in which the album is available: [ISO 3166-1 alpha-2 country codes](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). _**NOTE**: an album is considered available in a market when at least 1 of its tracks is available in that market._\n"),
  external_urls: z.object({
    spotify: z.string().optional().describe("The [Spotify URL](/documentation/web-api/#spotify-uris-and-ids) for the object.\n"),
  }).describe("Known external URLs for this album.\n"),
  href: z.string().describe("A link to the Web API endpoint providing full details of the album.\n"),
  id: z.string().describe("The [Spotify ID](/documentation/web-api/#spotify-uris-and-ids) for the album.\n"),
  images: z.array(z.object({
    height: z.number().int().nullable().describe("The image height in pixels.\n"),
    url: z.string().describe("The source URL of the image.\n"),
    width: z.number().int().nullable().describe("The image width in pixels.\n"),
  })).describe("The cover art for the album in various sizes, widest first.\n"),
  name: z.string().describe("The name of the album. In case of an album takedown, the value may be an empty string.\n"),
  release_date: z.string().describe("The date the album was first released.\n"),
  release_date_precision: z.enum(["year", "month", "day"]).describe("The precision with which `release_date` value is known.\n"),
  restrictions: z.object({
    reason: z.enum(["market", "product", "explicit"]).optional().describe("The reason for the restriction. Albums may be restricted if the content is not available in a given market, to the user's subscription type, or when the user's account is set to not play explicit content.\nAdditional reasons may be added in the future.\n"),
  }).optional().describe("Included in the response when a content restriction is applied.\n"),
  total_tracks: z.number().int().describe("The number of tracks in the album."),
  type: z.literal("album").describe("The object type.\n"),
  uri: z.string().describe("The [Spotify URI](/documentation/web-api/#spotify-uris-and-ids) for the album.\n"),
  artists: z.array(z.object({
    external_urls: z.object({
      spotify: z.string().optional().describe("The [Spotify URL](/documentation/web-api/#spotify-uris-and-ids) for the object.\n"),
    }).optional().describe("Known external URLs for this artist.\n"),
    href: z.string().optional().describe("A link to the Web API endpoint providing full details of the artist.\n"),
    id: z.string().optional().describe("The [Spotify ID](/documentation/web-api/#spotify-uris-and-ids) for the artist.\n"),
    name: z.string().optional().describe("The name of the artist.\n"),
    type: z.literal("artist").optional().describe("The object type.\n"),
    uri: z.string().optional().describe("The [Spotify URI](/documentation/web-api/#spotify-uris-and-ids) for the artist.\n"),
  })).optional().describe("The artists of the album. Each artist object includes a link in `href` to more detailed information about the artist.\n"),
  copyrights: z.array(z.object({
    text: z.string().optional().describe("The copyright text for this content.\n"),
    type: z.string().optional().describe("The type of copyright: `C` = the copyright, `P` = the sound recording (performance) copyright.\n"),
  })).optional().describe("The copyright statements of the album."),
  external_ids: z.object({
    ean: z.string().optional().describe("[International Article Number](http://en.wikipedia.org/wiki/International_Article_Number_%28EAN%29)\n"),
    isrc: z.string().optional().describe("[International Standard Recording Code](http://en.wikipedia.org/wiki/International_Standard_Recording_Code)\n"),
    upc: z.string().optional().describe("[Universal Product Code](http://en.wikipedia.org/wiki/Universal_Product_Code)\n"),
  }).optional().describe("Known external IDs for the album.\n"),
  genres: z.array(z.string()).optional().describe("A list of the genres used to classify the album. (If not yet classified, the array is empty.)"),
  label: z.string().optional().describe("The label for the album."),
  popularity: z.number().int().optional().describe("The popularity of the album, with 100 being the most popular. The popularity is calculated from the popularity of the album's individual tracks."),
  tracks: z.unknown().optional().describe("The tracks of the album.\n"),
})

export const getAnAlbum = pikkuSessionlessFunc({
  description: "Get Spotify catalog information for a single album.",
  input: GetAnAlbumInput,
  output: GetAnAlbumOutput,
  errors: [UnauthorizedError, ForbiddenError, TooManyRequestsError],
  func: async ({ spotify }, data) => {
    return spotify.call("GET", "/albums/{id}", data) as any
  },
})
