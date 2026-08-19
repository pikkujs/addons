// Issue resolutions — This resource represents issue resolution values. Use it to obtain a list of all issue resolution values and the details of individual resolution values.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const CreateResolutionInput = z.object({
  description: z.string().max(255).optional().describe("The description of the resolution."),
  name: z.string().max(60).describe("The name of the resolution. Must be unique (case-insensitive)."),
})

export const CreateResolutionOutput = z.object({
  id: z.string().describe("The ID of the issue resolution."),
}).describe("The ID of an issue resolution.")

export const createResolution = pikkuSessionlessFunc({
  description: "Creates an issue resolution.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: CreateResolutionInput,
  output: CreateResolutionOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/resolution", data) as any
  },
})
