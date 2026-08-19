import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, TooManyRequestsError } from '@pikku/core/errors'

export const SaveAlbumsUserInput = z.object({
  ids: z.string().describe("A comma-separated list of the [Spotify IDs](/documentation/web-api/#spotify-uris-and-ids) for the albums. Maximum: 20 IDs.\n"),
})

export const saveAlbumsUser = pikkuSessionlessFunc({
  description: "Save one or more albums to the current user's 'Your Music' library.",
  input: SaveAlbumsUserInput,
  errors: [UnauthorizedError, ForbiddenError, TooManyRequestsError],
  func: async ({ spotify }, data) => {
    return spotify.call("PUT", "/me/albums", data)
  },
})
