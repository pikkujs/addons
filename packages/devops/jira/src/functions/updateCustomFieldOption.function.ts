// Issue custom field options — This resource represents custom issue field select list options created in Jira or using the REST API. This resource supports the following field types: * Checkboxes. * Radio Buttons. * Select List (single choice). * Select List (multiple choices). * Select List (cascading). See [Issue custom field options (apps)](#api-group-Issue-custom-field-options--apps-) to manipulate custom issue field select list options created by a Connect app. Use it to retrieve, create, update, order, and delete custom field options.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const UpdateCustomFieldOptionInput = z.object({
  fieldId: z.string().describe("The ID of the custom field."),
  contextId: z.number().int().describe("The ID of the context."),
  options: z.array(z.object({
  disabled: z.boolean().optional().describe("Whether the option is disabled."),
  id: z.string().describe("The ID of the custom field option."),
  value: z.string().optional().describe("The value of the custom field option."),
})).optional().describe("Details of the options to update."),
})

export const UpdateCustomFieldOptionOutput = z.object({
  options: z.array(z.object({
    disabled: z.boolean().optional().describe("Whether the option is disabled."),
    id: z.string().describe("The ID of the custom field option."),
    value: z.string().optional().describe("The value of the custom field option."),
  })).optional().describe("The updated custom field options."),
}).describe("A list of custom field options for a context.")

export const updateCustomFieldOption = pikkuSessionlessFunc({
  description: "Updates the options of a custom field.\n\nIf any of the options are not found, no options are updated. Options where the values in the request match the current values aren't updated and aren't reported in the response.\n\nNote that this operation **only works for issue field select list options created in Jira or using operations from the [Issue custom field options](#api-group-Issue-custom-field-options) resource**, it cannot be used with issue field select list options created by Connect apps.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: UpdateCustomFieldOptionInput,
  output: UpdateCustomFieldOptionOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/field/{fieldId}/context/{contextId}/option", data) as any
  },
})
