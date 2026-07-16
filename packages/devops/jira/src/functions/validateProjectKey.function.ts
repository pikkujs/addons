// Project key and name validation — This resource provides validation for project keys and names.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError } from '@pikku/core/errors'

export const ValidateProjectKeyInput = z.object({
  key: z.string().optional().describe("The project key."),
})

export const ValidateProjectKeyOutput = z.object({
  errorMessages: z.array(z.string()).optional().describe("The list of error messages produced by this operation. For example, \"input parameter 'key' must be provided\""),
  errors: z.record(z.string(), z.string()).optional().describe("The list of errors by parameter returned by the operation. For example,\"projectKey\": \"Project keys must start with an uppercase letter, followed by one or more uppercase alphanumeric characters.\""),
  status: z.number().int().optional(),
}).describe("Error messages from an operation.")

export const validateProjectKey = pikkuSessionlessFunc({
  description: "Validates a project key by confirming the key is a valid string and not in use.\n\n**[Permissions](#permissions) required:** None.",
  input: ValidateProjectKeyInput,
  output: ValidateProjectKeyOutput,
  errors: [UnauthorizedError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/projectvalidate/key", data) as any
  },
})
