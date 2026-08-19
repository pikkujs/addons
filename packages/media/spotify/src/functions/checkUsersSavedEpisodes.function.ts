import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, TooManyRequestsError } from '@pikku/core/errors'

export const CheckUsersSavedEpisodesInput = z.object({
  ids: z.string().describe("A comma-separated list of the [Spotify IDs](/documentation/web-api/#spotify-uris-and-ids) for the episodes. Maximum: 50 IDs.\n"),
})

export const CheckUsersSavedEpisodesOutput = z.array(z.boolean())

export const checkUsersSavedEpisodes = pikkuSessionlessFunc({
  description: "Check if one or more episodes is already saved in the current Spotify user's 'Your Episodes' library.",
  input: CheckUsersSavedEpisodesInput,
  output: CheckUsersSavedEpisodesOutput,
  errors: [UnauthorizedError, ForbiddenError, TooManyRequestsError],
  func: async ({ spotify }, data) => {
    return spotify.call("GET", "/me/episodes/contains", data) as any
  },
})
