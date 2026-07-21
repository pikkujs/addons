import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, TooManyRequestsError } from '@pikku/core/errors'

export const UnfollowArtistsUsersInput = z.object({
  type: z.enum(["artist", "user"]).describe("The ID type: either `artist` or `user`.\n"),
  ids: z.string().describe("A comma-separated list of the artist or the user [Spotify IDs](/documentation/web-api/#spotify-uris-and-ids). For example: `ids=74ASZWbe4lXaubB36ztrGX,08td7MxkoHQkXnWAYD8d6Q`. A maximum of 50 IDs can be sent in one request.\n"),
})

export const unfollowArtistsUsers = pikkuSessionlessFunc({
  description: "Remove the current user as a follower of one or more artists or other Spotify users.",
  input: UnfollowArtistsUsersInput,
  errors: [UnauthorizedError, ForbiddenError, TooManyRequestsError],
  func: async ({ spotify }, data) => {
    return spotify.call("DELETE", "/me/following", data)
  },
})
