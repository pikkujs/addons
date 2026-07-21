import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, TooManyRequestsError } from '@pikku/core/errors'

export const CheckUsersSavedAlbumsInput = z.object({
  ids: z.string().describe("A comma-separated list of the [Spotify IDs](/documentation/web-api/#spotify-uris-and-ids) for the albums. Maximum: 20 IDs.\n"),
})

export const CheckUsersSavedAlbumsOutput = z.array(z.boolean())

export const checkUsersSavedAlbums = pikkuSessionlessFunc({
  description: "Check if one or more albums is already saved in the current Spotify user's 'Your Music' library.",
  input: CheckUsersSavedAlbumsInput,
  output: CheckUsersSavedAlbumsOutput,
  errors: [UnauthorizedError, ForbiddenError, TooManyRequestsError],
  func: async ({ spotify }, data) => {
    return spotify.call("GET", "/me/albums/contains", data) as any
  },
})
