import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AsteroidNeoLookupGetInput = z.object({
  asteroidId: z.string(),
})

export const AsteroidNeoLookupGetOutput = z.record(z.string(), z.unknown())

export const asteroidNeoLookupGet = pikkuSessionlessFunc({
  description: "Look up an asteroid by SPK-ID",
  input: AsteroidNeoLookupGetInput,
  output: AsteroidNeoLookupGetOutput,
  func: async ({ nasa }, data) => {
    return nasa.call("GET", "/neo/rest/v1/neo/{asteroidId}", data) as any
  },
})
