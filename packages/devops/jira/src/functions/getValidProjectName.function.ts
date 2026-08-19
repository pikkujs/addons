// Project key and name validation — This resource provides validation for project keys and names.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const GetValidProjectNameInput = z.object({
  name: z.string().describe("The project name."),
})

export const GetValidProjectNameOutput = z.string()

export const getValidProjectName = pikkuSessionlessFunc({
  description: "Checks that a project name isn't in use. If the name isn't in use, the passed string is returned. If the name is in use, this operation attempts to generate a valid project name based on the one supplied, usually by adding a sequence number. If a valid project name cannot be generated, a 404 response is returned.\n\n**[Permissions](#permissions) required:** None.",
  input: GetValidProjectNameInput,
  output: GetValidProjectNameOutput,
  errors: [BadRequestError, UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/projectvalidate/validProjectName", data) as any
  },
})
