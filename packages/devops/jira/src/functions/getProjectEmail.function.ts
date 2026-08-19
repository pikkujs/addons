// Project email — This resource represents the email address used to send a project's notifications. Use it to get and set the [project's sender email address](https://confluence.atlassian.com/x/dolKLg).

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const GetProjectEmailInput = z.object({
  projectId: z.number().int().describe("The project ID."),
})

export const GetProjectEmailOutput = z.object({
  emailAddress: z.string().optional().describe("The email address."),
  emailAddressStatus: z.array(z.string()).optional().describe("When using a custom domain, the status of the email address."),
}).describe("A project's sender email address.")

export const getProjectEmail = pikkuSessionlessFunc({
  description: "Returns the [project's sender email address](https://confluence.atlassian.com/x/dolKLg).\n\n**[Permissions](#permissions) required:** *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.",
  input: GetProjectEmailInput,
  output: GetProjectEmailOutput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/project/{projectId}/email", data) as any
  },
})
