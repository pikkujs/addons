// Issue field configurations — This resource represents issue field configurations. Use it to get, set, and delete field configurations and field configuration schemes.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const DeleteFieldConfigurationInput = z.object({
  id: z.number().int().describe("The ID of the field configuration."),
})

export const DeleteFieldConfigurationOutput = z.unknown()

export const deleteFieldConfiguration = pikkuSessionlessFunc({
  description: "Deletes a field configuration.\n\nThis operation can only delete configurations used in company-managed (classic) projects.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: DeleteFieldConfigurationInput,
  output: DeleteFieldConfigurationOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/fieldconfiguration/{id}", data) as any
  },
})
