import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, TooManyRequestsError } from '@pikku/core/errors'

export const RemoveAudiobooksUserInput = z.object({
  ids: z.string().describe("A comma-separated list of the [Spotify IDs](/documentation/web-api/#spotify-uris-and-ids). For example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.\n"),
})

export const removeAudiobooksUser = pikkuSessionlessFunc({
  description: "Remove one or more audiobooks from the Spotify user's library.",
  input: RemoveAudiobooksUserInput,
  errors: [UnauthorizedError, ForbiddenError, TooManyRequestsError],
  func: async ({ spotify }, data) => {
    return spotify.call("DELETE", "/me/audiobooks", data)
  },
})
