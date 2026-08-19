// Project email — This resource represents the email address used to send a project's notifications. Use it to get and set the [project's sender email address](https://confluence.atlassian.com/x/dolKLg).

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const UpdateProjectEmailInput = z.object({
  projectId: z.number().int().describe("The project ID."),
  emailAddress: z.string().optional().describe("The email address."),
  emailAddressStatus: z.array(z.string()).optional().describe("When using a custom domain, the status of the email address."),
})

export const UpdateProjectEmailOutput = z.unknown()

export const updateProjectEmail = pikkuSessionlessFunc({
  description: "Sets the [project's sender email address](https://confluence.atlassian.com/x/dolKLg).\n\nIf `emailAddress` is an empty string, the default email address is restored.\n\n**[Permissions](#permissions) required:** *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.",
  input: UpdateProjectEmailInput,
  output: UpdateProjectEmailOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/project/{projectId}/email", data) as any
  },
})
