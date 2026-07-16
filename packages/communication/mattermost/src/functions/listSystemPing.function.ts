// system — General endpoints for interating with the server, such as configuration and logging.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { InternalServerError } from '@pikku/core/errors'

export const ListSystemPingOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const listSystemPing = pikkuSessionlessFunc({
  description: "Check if the server is up and healthy based on the configuration setting `GoRoutineHealthThreshold`. If `GoRoutineHealthThreshold` and the number of goroutines on the server exceeds that threshold the server is considered unhealthy. If `GoRoutineHealthThreshold` is not set or the number of goroutines is below the threshold the server is considered healthy.\n__Minimum server version__: 3.10\n##### Permissions\nMust be logged in.",
  output: ListSystemPingOutput,
  errors: [InternalServerError],
  func: async ({ mattermost }) => {
    return mattermost.call("GET", "/system/ping") as any
  },
})
