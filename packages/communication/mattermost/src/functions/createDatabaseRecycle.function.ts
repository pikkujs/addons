// system — General endpoints for interating with the server, such as configuration and logging.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ForbiddenError } from '@pikku/core/errors'

export const CreateDatabaseRecycleOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const createDatabaseRecycle = pikkuSessionlessFunc({
  description: "Recycle database connections by closing and reconnecting all connections to master and read replica databases.\n##### Permissions\nMust have `manage_system` permission.",
  output: CreateDatabaseRecycleOutput,
  errors: [ForbiddenError],
  func: async ({ mattermost }) => {
    return mattermost.call("POST", "/database/recycle") as any
  },
})
