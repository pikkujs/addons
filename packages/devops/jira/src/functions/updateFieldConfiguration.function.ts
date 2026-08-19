// Issue field configurations — This resource represents issue field configurations. Use it to get, set, and delete field configurations and field configuration schemes.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const UpdateFieldConfigurationInput = z.object({
  id: z.number().int().describe("The ID of the field configuration."),
  description: z.string().max(255).optional().describe("The description of the field configuration."),
  name: z.string().max(255).describe("The name of the field configuration. Must be unique."),
})

export const UpdateFieldConfigurationOutput = z.unknown()

export const updateFieldConfiguration = pikkuSessionlessFunc({
  description: "Updates a field configuration. The name and the description provided in the request override the existing values.\n\nThis operation can only update configurations used in company-managed (classic) projects.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: UpdateFieldConfigurationInput,
  output: UpdateFieldConfigurationOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/fieldconfiguration/{id}", data) as any
  },
})
