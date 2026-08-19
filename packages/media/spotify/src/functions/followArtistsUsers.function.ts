import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, TooManyRequestsError } from '@pikku/core/errors'

export const FollowArtistsUsersInput = z.object({
  type: z.enum(["artist", "user"]).describe("The ID type.\n"),
  ids: z.string().describe("A comma-separated list of the artist or the user [Spotify IDs](/documentation/web-api/#spotify-uris-and-ids).\nA maximum of 50 IDs can be sent in one request.\n"),
})

export const followArtistsUsers = pikkuSessionlessFunc({
  description: "Add the current user as a follower of one or more artists or other Spotify users.",
  input: FollowArtistsUsersInput,
  errors: [UnauthorizedError, ForbiddenError, TooManyRequestsError],
  func: async ({ spotify }, data) => {
    return spotify.call("PUT", "/me/following", data)
  },
})
