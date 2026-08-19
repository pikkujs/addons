// Issue field configurations — This resource represents issue field configurations. Use it to get, set, and delete field configurations and field configuration schemes.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const CreateFieldConfigurationSchemeInput = z.object({
  description: z.string().max(1024).optional().describe("The description of the field configuration scheme."),
  name: z.string().max(255).describe("The name of the field configuration scheme. The name must be unique."),
})

export const CreateFieldConfigurationSchemeOutput = z.object({
  description: z.string().optional().describe("The description of the field configuration scheme."),
  id: z.string().describe("The ID of the field configuration scheme."),
  name: z.string().describe("The name of the field configuration scheme."),
}).describe("Details of a field configuration scheme.")

export const createFieldConfigurationScheme = pikkuSessionlessFunc({
  description: "Creates a field configuration scheme.\n\nThis operation can only create field configuration schemes used in company-managed (classic) projects.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: CreateFieldConfigurationSchemeInput,
  output: CreateFieldConfigurationSchemeOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/fieldconfigurationscheme", data) as any
  },
})
