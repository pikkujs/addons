// Time tracking — This resource represents time tracking and time tracking providers. Use it to get and set the time tracking provider, get and set the time tracking options, and disable time tracking.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const GetSelectedTimeTrackingImplementationOutput = z.object({
  key: z.string().describe("The key for the time tracking provider. For example, *JIRA*."),
  name: z.string().optional().describe("The name of the time tracking provider. For example, *JIRA provided time tracking*."),
  url: z.string().optional().describe("The URL of the configuration page for the time tracking provider app. For example, * /example/config/url*. This property is only returned if the `adminPageKey` property is set in the module descriptor of the time tracking provider app."),
}).describe("Details about the time tracking provider.")

export const getSelectedTimeTrackingImplementation = pikkuSessionlessFunc({
  description: "Returns the time tracking provider that is currently selected. Note that if time tracking is disabled, then a successful but empty response is returned.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  output: GetSelectedTimeTrackingImplementationOutput,
  errors: [UnauthorizedError, ForbiddenError],
  func: async ({ jira }) => {
    return jira.call("GET", "/rest/api/3/configuration/timetracking") as any
  },
})
