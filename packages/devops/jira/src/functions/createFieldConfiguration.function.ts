// Issue field configurations — This resource represents issue field configurations. Use it to get, set, and delete field configurations and field configuration schemes.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const CreateFieldConfigurationInput = z.object({
  description: z.string().max(255).optional().describe("The description of the field configuration."),
  name: z.string().max(255).describe("The name of the field configuration. Must be unique."),
})

export const CreateFieldConfigurationOutput = z.object({
  description: z.string().describe("The description of the field configuration."),
  id: z.number().int().describe("The ID of the field configuration."),
  isDefault: z.boolean().optional().describe("Whether the field configuration is the default."),
  name: z.string().describe("The name of the field configuration."),
}).describe("Details of a field configuration.")

export const createFieldConfiguration = pikkuSessionlessFunc({
  description: "Creates a field configuration. The field configuration is created with the same field properties as the default configuration, with all the fields being optional.\n\nThis operation can only create configurations for use in company-managed (classic) projects.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: CreateFieldConfigurationInput,
  output: CreateFieldConfigurationOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/fieldconfiguration", data) as any
  },
})
