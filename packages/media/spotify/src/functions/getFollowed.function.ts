import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, TooManyRequestsError } from '@pikku/core/errors'

export const GetFollowedInput = z.object({
  type: z.literal("artist").describe("The ID type: currently only `artist` is supported.\n"),
  after: z.string().optional().describe("The last artist ID retrieved from the previous request.\n"),
  limit: z.number().int().min(1).max(50).optional().default(20).describe("The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n"),
})

export const GetFollowedOutput = z.object({
  artists: z.object({
    cursors: z.object({
      after: z.string().optional().describe("The cursor to use as key to find the next page of items."),
      before: z.string().optional().describe("The cursor to use as key to find the previous page of items."),
    }).optional().describe("The cursors used to find the next set of items."),
    href: z.string().optional().describe("A link to the Web API endpoint returning the full result of the request."),
    limit: z.number().int().optional().describe("The maximum number of items in the response (as set in the query or by default)."),
    next: z.string().optional().describe("URL to the next page of items. ( `null` if none)"),
    total: z.number().int().optional().describe("The total number of items available to return."),
    items: z.array(z.object({
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
    })).optional(),
  }),
})

export const getFollowed = pikkuSessionlessFunc({
  description: "Get the current user's followed artists.",
  input: GetFollowedInput,
  output: GetFollowedOutput,
  errors: [UnauthorizedError, ForbiddenError, TooManyRequestsError],
  func: async ({ spotify }, data) => {
    return spotify.call("GET", "/me/following", data) as any
  },
})
