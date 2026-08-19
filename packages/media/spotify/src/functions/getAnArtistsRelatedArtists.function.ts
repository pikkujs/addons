import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, TooManyRequestsError } from '@pikku/core/errors'

export const GetAnArtistsRelatedArtistsInput = z.object({
  id: z.string().describe("The [Spotify ID](/documentation/web-api/#spotify-uris-and-ids) of the artist.\n"),
})

export const GetAnArtistsRelatedArtistsOutput = z.object({
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
  })),
})

export const getAnArtistsRelatedArtists = pikkuSessionlessFunc({
  description: "Get Spotify catalog information about artists similar to a given artist. Similarity is based on analysis of the Spotify community's [listening history](http://news.spotify.com/se/2010/02/03/related-artists/).",
  input: GetAnArtistsRelatedArtistsInput,
  output: GetAnArtistsRelatedArtistsOutput,
  errors: [UnauthorizedError, ForbiddenError, TooManyRequestsError],
  func: async ({ spotify }, data) => {
    return spotify.call("GET", "/artists/{id}/related-artists", data) as any
  },
})
