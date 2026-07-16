import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, TooManyRequestsError } from '@pikku/core/errors'

export const SaveEpisodesUserInput = z.object({
  ids: z.string().describe("A comma-separated list of the [Spotify IDs](/documentation/web-api/#spotify-uris-and-ids). Maximum: 50 IDs.\n"),
})

export const saveEpisodesUser = pikkuSessionlessFunc({
  description: "Save one or more episodes to the current user's library.",
  input: SaveEpisodesUserInput,
  errors: [UnauthorizedError, ForbiddenError, TooManyRequestsError],
  func: async ({ spotify }, data) => {
    return spotify.call("PUT", "/me/episodes", data)
  },
})
