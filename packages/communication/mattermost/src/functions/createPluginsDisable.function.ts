// plugins — Endpoints related to uploading and managing plugins.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const CreatePluginsDisableInput = z.object({
  plugin_id: z.string(),
})

export const CreatePluginsDisableOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const createPluginsDisable = pikkuSessionlessFunc({
  description: "Disable a previously enabled plugin. Plugins must be enabled in the server's config settings.\n\n##### Permissions\nMust have `manage_system` permission.\n\n__Minimum server version__: 4.4",
  input: CreatePluginsDisableInput,
  output: CreatePluginsDisableOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("POST", "/plugins/{plugin_id}/disable", data) as any
  },
})
