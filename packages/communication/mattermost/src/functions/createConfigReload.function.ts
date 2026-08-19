// system — General endpoints for interating with the server, such as configuration and logging.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, ForbiddenError } from '@pikku/core/errors'

export const CreateConfigReloadOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const createConfigReload = pikkuSessionlessFunc({
  description: "Reload the configuration file to pick up on any changes made to it.\n##### Permissions\nMust have `manage_system` permission.",
  output: CreateConfigReloadOutput,
  errors: [BadRequestError, ForbiddenError],
  func: async ({ mattermost }) => {
    return mattermost.call("POST", "/config/reload") as any
  },
})
