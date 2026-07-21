// Issue resolutions — This resource represents issue resolution values. Use it to obtain a list of all issue resolution values and the details of individual resolution values.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const GetResolutionInput = z.object({
  id: z.string().describe("The ID of the issue resolution value."),
})

export const GetResolutionOutput = z.object({
  description: z.string().optional().describe("The description of the issue resolution."),
  id: z.string().optional().describe("The ID of the issue resolution."),
  name: z.string().optional().describe("The name of the issue resolution."),
  self: z.string().url().optional().describe("The URL of the issue resolution."),
}).describe("Details of an issue resolution.")

export const getResolution = pikkuSessionlessFunc({
  description: "Returns an issue resolution value.\n\n**[Permissions](#permissions) required:** Permission to access Jira.",
  input: GetResolutionInput,
  output: GetResolutionOutput,
  errors: [UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/resolution/{id}", data) as any
  },
})
