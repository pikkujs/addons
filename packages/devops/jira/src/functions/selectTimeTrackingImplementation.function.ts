// Time tracking — This resource represents time tracking and time tracking providers. Use it to get and set the time tracking provider, get and set the time tracking options, and disable time tracking.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const SelectTimeTrackingImplementationInput = z.object({
  key: z.string().describe("The key for the time tracking provider. For example, *JIRA*."),
  name: z.string().optional().describe("The name of the time tracking provider. For example, *JIRA provided time tracking*."),
})

export const SelectTimeTrackingImplementationOutput = z.unknown()

export const selectTimeTrackingImplementation = pikkuSessionlessFunc({
  description: "Selects a time tracking provider.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: SelectTimeTrackingImplementationInput,
  output: SelectTimeTrackingImplementationOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/configuration/timetracking", data) as any
  },
})
