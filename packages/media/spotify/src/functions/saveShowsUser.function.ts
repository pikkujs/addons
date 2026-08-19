import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, TooManyRequestsError } from '@pikku/core/errors'

export const SaveShowsUserInput = z.object({
  ids: z.string().describe("A comma-separated list of the [Spotify IDs](/documentation/web-api/#spotify-uris-and-ids) for the shows. Maximum: 50 IDs.\n"),
})

export const saveShowsUser = pikkuSessionlessFunc({
  description: "Save one or more shows to current Spotify user's library.",
  input: SaveShowsUserInput,
  errors: [UnauthorizedError, ForbiddenError, TooManyRequestsError],
  func: async ({ spotify }, data) => {
    return spotify.call("PUT", "/me/shows", data)
  },
})
