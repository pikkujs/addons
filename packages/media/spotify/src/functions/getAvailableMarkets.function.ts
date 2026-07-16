import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, TooManyRequestsError } from '@pikku/core/errors'

export const GetAvailableMarketsOutput = z.object({
  markets: z.array(z.string()).optional(),
})

export const getAvailableMarkets = pikkuSessionlessFunc({
  description: "Get the list of markets where Spotify is available.",
  output: GetAvailableMarketsOutput,
  errors: [UnauthorizedError, ForbiddenError, TooManyRequestsError],
  func: async ({ spotify }) => {
    return spotify.call("GET", "/markets") as any
  },
})
