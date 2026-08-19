// plugins — Endpoints related to uploading and managing plugins.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const DeletePluginInput = z.object({
  plugin_id: z.string(),
})

export const DeletePluginOutput = z.object({
  status: z.string().optional().describe("Will contain \"ok\" if the request was successful and there was nothing else to return"),
})

export const deletePlugin = pikkuSessionlessFunc({
  description: "Remove the plugin with the provided ID from the server. All plugin files are deleted. Plugins must be enabled in the server's config settings.\n\n##### Permissions\nMust have `manage_system` permission.\n\n__Minimum server version__: 4.4",
  input: DeletePluginInput,
  output: DeletePluginOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }, data) => {
    return mattermost.call("DELETE", "/plugins/{plugin_id}", data) as any
  },
})
