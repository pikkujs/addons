import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, TooManyRequestsError } from '@pikku/core/errors'

export const GetUsersProfileInput = z.object({
  user_id: z.string().describe("The user's [Spotify user ID](/documentation/web-api/#spotify-uris-and-ids).\n"),
})

export const GetUsersProfileOutput = z.object({
  display_name: z.string().nullable().optional().describe("The name displayed on the user's profile. `null` if not available.\n"),
  external_urls: z.object({
    spotify: z.string().optional().describe("The [Spotify URL](/documentation/web-api/#spotify-uris-and-ids) for the object.\n"),
  }).optional().describe("Known public external URLs for this user.\n"),
  followers: z.object({
    href: z.string().nullable().optional().describe("This will always be set to null, as the Web API does not support it at the moment.\n"),
    total: z.number().int().optional().describe("The total number of followers.\n"),
  }).optional().describe("Information about the followers of this user.\n"),
  href: z.string().optional().describe("A link to the Web API endpoint for this user.\n"),
  id: z.string().optional().describe("The [Spotify user ID](/documentation/web-api/#spotify-uris-and-ids) for this user.\n"),
  images: z.array(z.object({
    height: z.number().int().nullable().describe("The image height in pixels.\n"),
    url: z.string().describe("The source URL of the image.\n"),
    width: z.number().int().nullable().describe("The image width in pixels.\n"),
  })).optional().describe("The user's profile image.\n"),
  type: z.literal("user").optional().describe("The object type.\n"),
  uri: z.string().optional().describe("The [Spotify URI](/documentation/web-api/#spotify-uris-and-ids) for this user.\n"),
})

export const getUsersProfile = pikkuSessionlessFunc({
  description: "Get public profile information about a Spotify user.",
  input: GetUsersProfileInput,
  output: GetUsersProfileOutput,
  errors: [UnauthorizedError, ForbiddenError, TooManyRequestsError],
  func: async ({ spotify }, data) => {
    return spotify.call("GET", "/users/{user_id}", data) as any
  },
})
