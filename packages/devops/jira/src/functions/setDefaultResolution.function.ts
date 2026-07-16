// Issue resolutions — This resource represents issue resolution values. Use it to obtain a list of all issue resolution values and the details of individual resolution values.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const SetDefaultResolutionInput = z.object({
  id: z.string().describe("The ID of the new default issue resolution. Must be an existing ID or null. Setting this to null erases the default resolution setting."),
})

export const SetDefaultResolutionOutput = z.unknown()

export const setDefaultResolution = pikkuSessionlessFunc({
  description: "Sets default issue resolution.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: SetDefaultResolutionInput,
  output: SetDefaultResolutionOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/resolution/default", data) as any
  },
})
