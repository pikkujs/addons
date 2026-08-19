// Issue field configurations — This resource represents issue field configurations. Use it to get, set, and delete field configurations and field configuration schemes.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const DeleteFieldConfigurationSchemeInput = z.object({
  id: z.number().int().describe("The ID of the field configuration scheme."),
})

export const DeleteFieldConfigurationSchemeOutput = z.unknown()

export const deleteFieldConfigurationScheme = pikkuSessionlessFunc({
  description: "Deletes a field configuration scheme.\n\nThis operation can only delete field configuration schemes used in company-managed (classic) projects.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: DeleteFieldConfigurationSchemeInput,
  output: DeleteFieldConfigurationSchemeOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/fieldconfigurationscheme/{id}", data) as any
  },
})
