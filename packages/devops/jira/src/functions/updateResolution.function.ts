// Issue resolutions — This resource represents issue resolution values. Use it to obtain a list of all issue resolution values and the details of individual resolution values.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const UpdateResolutionInput = z.object({
  id: z.string().describe("The ID of the issue resolution."),
  description: z.string().max(255).optional().describe("The description of the resolution."),
  name: z.string().max(60).describe("The name of the resolution. Must be unique."),
})

export const UpdateResolutionOutput = z.unknown()

export const updateResolution = pikkuSessionlessFunc({
  description: "Updates an issue resolution.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: UpdateResolutionInput,
  output: UpdateResolutionOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/resolution/{id}", data) as any
  },
})
