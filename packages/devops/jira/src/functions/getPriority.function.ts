// Issue priorities — This resource represents issue priorities. Use it to get, create and update issue priorities and details for individual issue priorities.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const GetPriorityInput = z.object({
  id: z.string().describe("The ID of the issue priority."),
})

export const GetPriorityOutput = z.object({
  description: z.string().optional().describe("The description of the issue priority."),
  iconUrl: z.string().optional().describe("The URL of the icon for the issue priority."),
  id: z.string().optional().describe("The ID of the issue priority."),
  isDefault: z.boolean().optional().describe("Whether this priority is the default."),
  name: z.string().optional().describe("The name of the issue priority."),
  self: z.string().optional().describe("The URL of the issue priority."),
  statusColor: z.string().optional().describe("The color used to indicate the issue priority."),
}).describe("An issue priority.")

export const getPriority = pikkuSessionlessFunc({
  description: "Returns an issue priority.\n\n**[Permissions](#permissions) required:** Permission to access Jira.",
  input: GetPriorityInput,
  output: GetPriorityOutput,
  errors: [UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/priority/{id}", data) as any
  },
})
