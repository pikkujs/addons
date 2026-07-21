import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, TooManyRequestsError } from '@pikku/core/errors'

export const CheckCurrentUserFollowsInput = z.object({
  type: z.enum(["artist", "user"]).describe("The ID type: either `artist` or `user`.\n"),
  ids: z.string().describe("A comma-separated list of the artist or the user [Spotify IDs](/documentation/web-api/#spotify-uris-and-ids) to check. For example: `ids=74ASZWbe4lXaubB36ztrGX,08td7MxkoHQkXnWAYD8d6Q`. A maximum of 50 IDs can be sent in one request.\n"),
})

export const CheckCurrentUserFollowsOutput = z.array(z.boolean())

export const checkCurrentUserFollows = pikkuSessionlessFunc({
  description: "Check to see if the current user is following one or more artists or other Spotify users.",
  input: CheckCurrentUserFollowsInput,
  output: CheckCurrentUserFollowsOutput,
  errors: [UnauthorizedError, ForbiddenError, TooManyRequestsError],
  func: async ({ spotify }, data) => {
    return spotify.call("GET", "/me/following/contains", data) as any
  },
})
