// Issue priorities — This resource represents issue priorities. Use it to get, create and update issue priorities and details for individual issue priorities.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const CreatePriorityInput = z.object({
  description: z.string().max(255).optional().describe("The description of the priority."),
  iconUrl: z.enum(["/images/icons/priorities/blocker.png", "/images/icons/priorities/critical.png", "/images/icons/priorities/high.png", "/images/icons/priorities/highest.png", "/images/icons/priorities/low.png", "/images/icons/priorities/lowest.png", "/images/icons/priorities/major.png", "/images/icons/priorities/medium.png", "/images/icons/priorities/minor.png", "/images/icons/priorities/trivial.png"]).optional().describe("The URL of an icon for the priority. Accepted protocols are HTTP and HTTPS. Built in icons can also be used."),
  name: z.string().max(60).describe("The name of the priority. Must be unique."),
  statusColor: z.string().describe("The status color of the priority in 3-digit or 6-digit hexadecimal format."),
})

export const CreatePriorityOutput = z.object({
  id: z.string().describe("The ID of the issue priority."),
}).describe("The ID of an issue priority.")

export const createPriority = pikkuSessionlessFunc({
  description: "Creates an issue priority.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: CreatePriorityInput,
  output: CreatePriorityOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/priority", data) as any
  },
})
