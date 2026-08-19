import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, TooManyRequestsError } from '@pikku/core/errors'

export const CheckUsersSavedAudiobooksInput = z.object({
  ids: z.string().describe("A comma-separated list of the [Spotify IDs](/documentation/web-api/#spotify-uris-and-ids). For example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.\n"),
})

export const CheckUsersSavedAudiobooksOutput = z.array(z.boolean())

export const checkUsersSavedAudiobooks = pikkuSessionlessFunc({
  description: "Check if one or more audiobooks are already saved in the current Spotify user's library.",
  input: CheckUsersSavedAudiobooksInput,
  output: CheckUsersSavedAudiobooksOutput,
  errors: [UnauthorizedError, ForbiddenError, TooManyRequestsError],
  func: async ({ spotify }, data) => {
    return spotify.call("GET", "/me/audiobooks/contains", data) as any
  },
})
