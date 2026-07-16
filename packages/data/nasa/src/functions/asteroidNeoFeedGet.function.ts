import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AsteroidNeoFeedGetInput = z.object({
  start_date: z.string().optional(),
  end_date: z.string().optional(),
})

export const AsteroidNeoFeedGetOutput = z.record(z.string(), z.unknown())

export const asteroidNeoFeedGet = pikkuSessionlessFunc({
  description: "Retrieve asteroids by closest approach date",
  input: AsteroidNeoFeedGetInput,
  output: AsteroidNeoFeedGetOutput,
  func: async ({ nasa }, data) => {
    return nasa.call("GET", "/neo/rest/v1/feed", data) as any
  },
})
