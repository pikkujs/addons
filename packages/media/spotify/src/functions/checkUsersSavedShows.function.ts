import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, TooManyRequestsError } from '@pikku/core/errors'

export const CheckUsersSavedShowsInput = z.object({
  ids: z.string().describe("A comma-separated list of the [Spotify IDs](/documentation/web-api/#spotify-uris-and-ids) for the shows. Maximum: 50 IDs.\n"),
})

export const CheckUsersSavedShowsOutput = z.array(z.boolean())

export const checkUsersSavedShows = pikkuSessionlessFunc({
  description: "Check if one or more shows is already saved in the current Spotify user's library.",
  input: CheckUsersSavedShowsInput,
  output: CheckUsersSavedShowsOutput,
  errors: [UnauthorizedError, ForbiddenError, TooManyRequestsError],
  func: async ({ spotify }, data) => {
    return spotify.call("GET", "/me/shows/contains", data) as any
  },
})
