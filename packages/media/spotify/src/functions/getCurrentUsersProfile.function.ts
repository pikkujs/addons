import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, TooManyRequestsError } from '@pikku/core/errors'

export const GetCurrentUsersProfileOutput = z.object({
  country: z.string().optional().describe("The country of the user, as set in the user's account profile. An [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). _This field is only available when the current user has granted access to the [user-read-private](/documentation/general/guides/authorization-guide/#list-of-scopes) scope._\n"),
  display_name: z.string().optional().describe("The name displayed on the user's profile. `null` if not available.\n"),
  email: z.string().optional().describe("The user's email address, as entered by the user when creating their account. _**Important!** This email address is unverified; there is no proof that it actually belongs to the user._ _This field is only available when the current user has granted access to the [user-read-email](/documentation/general/guides/authorization-guide/#list-of-scopes) scope._\n"),
  explicit_content: z.object({
    filter_enabled: z.boolean().optional().describe("When `true`, indicates that explicit content should not be played.\n"),
    filter_locked: z.boolean().optional().describe("When `true`, indicates that the explicit content setting is locked and can't be changed by the user.\n"),
  }).optional().describe("The user's explicit content settings. _This field is only available when the current user has granted access to the [user-read-private](/documentation/general/guides/authorization-guide/#list-of-scopes) scope._\n"),
  external_urls: z.object({
    spotify: z.string().optional().describe("The [Spotify URL](/documentation/web-api/#spotify-uris-and-ids) for the object.\n"),
  }).optional().describe("Known external URLs for this user."),
  followers: z.object({
    href: z.string().nullable().optional().describe("This will always be set to null, as the Web API does not support it at the moment.\n"),
    total: z.number().int().optional().describe("The total number of followers.\n"),
  }).optional().describe("Information about the followers of the user."),
  href: z.string().optional().describe("A link to the Web API endpoint for this user.\n"),
  id: z.string().optional().describe("The [Spotify user ID](/documentation/web-api/#spotify-uris-and-ids) for the user.\n"),
  images: z.array(z.object({
    height: z.number().int().nullable().describe("The image height in pixels.\n"),
    url: z.string().describe("The source URL of the image.\n"),
    width: z.number().int().nullable().describe("The image width in pixels.\n"),
  })).optional().describe("The user's profile image."),
  product: z.string().optional().describe("The user's Spotify subscription level: \"premium\", \"free\", etc. (The subscription level \"open\" can be considered the same as \"free\".) _This field is only available when the current user has granted access to the [user-read-private](/documentation/general/guides/authorization-guide/#list-of-scopes) scope._\n"),
  type: z.string().optional().describe("The object type: \"user\"\n"),
  uri: z.string().optional().describe("The [Spotify URI](/documentation/web-api/#spotify-uris-and-ids) for the user.\n"),
})

export const getCurrentUsersProfile = pikkuSessionlessFunc({
  description: "Get detailed profile information about the current user (including the\ncurrent user's username).",
  output: GetCurrentUsersProfileOutput,
  errors: [UnauthorizedError, ForbiddenError, TooManyRequestsError],
  func: async ({ spotify }) => {
    return spotify.call("GET", "/me") as any
  },
})
