import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, TooManyRequestsError } from '@pikku/core/errors'

export const CheckUsersSavedTracksInput = z.object({
  ids: z.string().describe("A comma-separated list of the [Spotify IDs](/documentation/web-api/#spotify-uris-and-ids). For example: `ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M`. Maximum: 50 IDs.\n"),
})

export const CheckUsersSavedTracksOutput = z.array(z.boolean())

export const checkUsersSavedTracks = pikkuSessionlessFunc({
  description: "Check if one or more tracks is already saved in the current Spotify user's 'Your Music' library.",
  input: CheckUsersSavedTracksInput,
  output: CheckUsersSavedTracksOutput,
  errors: [UnauthorizedError, ForbiddenError, TooManyRequestsError],
  func: async ({ spotify }, data) => {
    return spotify.call("GET", "/me/tracks/contains", data) as any
  },
})
