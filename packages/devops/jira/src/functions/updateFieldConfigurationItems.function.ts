// Issue field configurations — This resource represents issue field configurations. Use it to get, set, and delete field configurations and field configuration schemes.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const UpdateFieldConfigurationItemsInput = z.object({
  id: z.number().int().describe("The ID of the field configuration."),
  fieldConfigurationItems: z.array(z.object({
  description: z.string().optional().describe("The description of the field within the field configuration."),
  id: z.string().describe("The ID of the field within the field configuration."),
  isHidden: z.boolean().optional().describe("Whether the field is hidden in the field configuration."),
  isRequired: z.boolean().optional().describe("Whether the field is required in the field configuration."),
  renderer: z.string().optional().describe("The renderer type for the field within the field configuration."),
})).describe("Details of fields in a field configuration."),
})

export const UpdateFieldConfigurationItemsOutput = z.unknown()

export const updateFieldConfigurationItems = pikkuSessionlessFunc({
  description: "Updates fields in a field configuration. The properties of the field configuration fields provided override the existing values.\n\nThis operation can only update field configurations used in company-managed (classic) projects.\n\nThe operation can set the renderer for text fields to the default text renderer (`text-renderer`) or wiki style renderer (`wiki-renderer`). However, the renderer cannot be updated for fields using the autocomplete renderer (`autocomplete-renderer`).\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: UpdateFieldConfigurationItemsInput,
  output: UpdateFieldConfigurationItemsOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/fieldconfiguration/{id}/fields", data) as any
  },
})
