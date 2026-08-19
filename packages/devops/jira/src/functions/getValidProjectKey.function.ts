// Project key and name validation — This resource provides validation for project keys and names.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError } from '@pikku/core/errors'

export const GetValidProjectKeyInput = z.object({
  key: z.string().optional().describe("The project key."),
})

export const GetValidProjectKeyOutput = z.string()

export const getValidProjectKey = pikkuSessionlessFunc({
  description: "Validates a project key and, if the key is invalid or in use, generates a valid random string for the project key.\n\n**[Permissions](#permissions) required:** None.",
  input: GetValidProjectKeyInput,
  output: GetValidProjectKeyOutput,
  errors: [UnauthorizedError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/projectvalidate/validProjectKey", data) as any
  },
})
