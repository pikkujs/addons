import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, TooManyRequestsError } from '@pikku/core/errors'

export const SaveAudiobooksUserInput = z.object({
  ids: z.string().describe("A comma-separated list of the [Spotify IDs](/documentation/web-api/#spotify-uris-and-ids). For example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.\n"),
})

export const saveAudiobooksUser = pikkuSessionlessFunc({
  description: "Save one or more audiobooks to the current Spotify user's library.",
  input: SaveAudiobooksUserInput,
  errors: [UnauthorizedError, ForbiddenError, TooManyRequestsError],
  func: async ({ spotify }, data) => {
    return spotify.call("PUT", "/me/audiobooks", data)
  },
})
