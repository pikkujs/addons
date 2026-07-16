// system — General endpoints for interating with the server, such as configuration and logging.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ForbiddenError } from '@pikku/core/errors'

export const CreateCachesInvalidateOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const createCachesInvalidate = pikkuSessionlessFunc({
  description: "Purge all the in-memory caches for the Mattermost server. This can have a temporary negative effect on performance while the caches are re-populated.\n##### Permissions\nMust have `manage_system` permission.",
  output: CreateCachesInvalidateOutput,
  errors: [ForbiddenError],
  func: async ({ mattermost }) => {
    return mattermost.call("POST", "/caches/invalidate") as any
  },
})
