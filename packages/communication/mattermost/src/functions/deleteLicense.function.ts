// system — General endpoints for interating with the server, such as configuration and logging.

import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const deleteLicense = pikkuSessionlessFunc({
  description: "Remove the license file from the server. This will disable all enterprise features.\n\n__Minimum server version__: 4.0\n\n##### Permissions\nMust have `manage_system` permission.",
  errors: [UnauthorizedError, ForbiddenError],
  func: async ({ mattermost }) => {
    return mattermost.call("DELETE", "/license")
  },
})
