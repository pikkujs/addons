// Time tracking — This resource represents time tracking and time tracking providers. Use it to get and set the time tracking provider, get and set the time tracking options, and disable time tracking.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const GetAvailableTimeTrackingImplementationsOutput = z.array(z.object({
  key: z.string().describe("The key for the time tracking provider. For example, *JIRA*."),
  name: z.string().optional().describe("The name of the time tracking provider. For example, *JIRA provided time tracking*."),
  url: z.string().optional().describe("The URL of the configuration page for the time tracking provider app. For example, * /example/config/url*. This property is only returned if the `adminPageKey` property is set in the module descriptor of the time tracking provider app."),
}))

export const getAvailableTimeTrackingImplementations = pikkuSessionlessFunc({
  description: "Returns all time tracking providers. By default, Jira only has one time tracking provider: *JIRA provided time tracking*. However, you can install other time tracking providers via apps from the Atlassian Marketplace. For more information on time tracking providers, see the documentation for the [ Time Tracking Provider](https://developer.atlassian.com/cloud/jira/platform/modules/time-tracking-provider/) module.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  output: GetAvailableTimeTrackingImplementationsOutput,
  errors: [UnauthorizedError, ForbiddenError],
  func: async ({ jira }) => {
    return jira.call("GET", "/rest/api/3/configuration/timetracking/list") as any
  },
})
