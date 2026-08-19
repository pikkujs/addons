// Issue field configurations — This resource represents issue field configurations. Use it to get, set, and delete field configurations and field configuration schemes.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const UpdateFieldConfigurationSchemeInput = z.object({
  id: z.number().int().describe("The ID of the field configuration scheme."),
  description: z.string().max(1024).optional().describe("The description of the field configuration scheme."),
  name: z.string().max(255).describe("The name of the field configuration scheme. The name must be unique."),
})

export const UpdateFieldConfigurationSchemeOutput = z.unknown()

export const updateFieldConfigurationScheme = pikkuSessionlessFunc({
  description: "Updates a field configuration scheme.\n\nThis operation can only update field configuration schemes used in company-managed (classic) projects.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: UpdateFieldConfigurationSchemeInput,
  output: UpdateFieldConfigurationSchemeOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/fieldconfigurationscheme/{id}", data) as any
  },
})
