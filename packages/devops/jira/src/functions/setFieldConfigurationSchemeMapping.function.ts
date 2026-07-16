// Issue field configurations — This resource represents issue field configurations. Use it to get, set, and delete field configurations and field configuration schemes.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const SetFieldConfigurationSchemeMappingInput = z.object({
  id: z.number().int().describe("The ID of the field configuration scheme."),
  mappings: z.array(z.object({
  fieldConfigurationId: z.string().describe("The ID of the field configuration."),
  issueTypeId: z.string().describe("The ID of the issue type or *default*. When set to *default* this field configuration issue type item applies to all issue types without a field configuration. An issue type can be included only once in a request."),
})).describe("Field configuration to issue type mappings."),
})

export const SetFieldConfigurationSchemeMappingOutput = z.unknown()

export const setFieldConfigurationSchemeMapping = pikkuSessionlessFunc({
  description: "Assigns issue types to field configurations on field configuration scheme.\n\nThis operation can only modify field configuration schemes used in company-managed (classic) projects.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: SetFieldConfigurationSchemeMappingInput,
  output: SetFieldConfigurationSchemeMappingOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/fieldconfigurationscheme/{id}/mapping", data) as any
  },
})
