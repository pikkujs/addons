import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, TooManyRequestsError } from '@pikku/core/errors'

export const GetRecommendationGenresOutput = z.object({
  genres: z.array(z.string()),
})

export const getRecommendationGenres = pikkuSessionlessFunc({
  description: "Retrieve a list of available genres seed parameter values for [recommendations](/documentation/web-api/reference/#/operations/get-recommendations).",
  output: GetRecommendationGenresOutput,
  errors: [UnauthorizedError, ForbiddenError, TooManyRequestsError],
  func: async ({ spotify }) => {
    return spotify.call("GET", "/recommendations/available-genre-seeds") as any
  },
})
