// plugins — Endpoints related to uploading and managing plugins.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const CreatePluginsEnableInput = z.object({
  plugin_id: z.string(),
})

export const CreatePluginsEnableOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const createPluginsEnable = pikkuSessionlessFunc({
  description: "Enable a previously uploaded plugin. Plugins must be enabled in the server's config settings.\n\n##### Permissions\nMust have `manage_system` permission.\n\n__Minimum server version__: 4.4",
  input: CreatePluginsEnableInput,
  output: CreatePluginsEnableOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("POST", "/plugins/{plugin_id}/enable", data) as any
  },
})
