// Issue custom field options — This resource represents custom issue field select list options created in Jira or using the REST API. This resource supports the following field types: * Checkboxes. * Radio Buttons. * Select List (single choice). * Select List (multiple choices). * Select List (cascading). See [Issue custom field options (apps)](#api-group-Issue-custom-field-options--apps-) to manipulate custom issue field select list options created by a Connect app. Use it to retrieve, create, update, order, and delete custom field options.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const CreateCustomFieldOptionInput = z.object({
  fieldId: z.string().describe("The ID of the custom field."),
  contextId: z.number().int().describe("The ID of the context."),
  options: z.array(z.object({
  disabled: z.boolean().optional().describe("Whether the option is disabled."),
  optionId: z.string().optional().describe("For cascading options, the ID of the custom field object containing the cascading option."),
  value: z.string().describe("The value of the custom field option."),
})).optional().describe("Details of options to create."),
})

export const CreateCustomFieldOptionOutput = z.object({
  options: z.array(z.object({
    disabled: z.boolean().describe("Whether the option is disabled."),
    id: z.string().describe("The ID of the custom field option."),
    optionId: z.string().optional().describe("For cascading options, the ID of the custom field option containing the cascading option."),
    value: z.string().describe("The value of the custom field option."),
  })).optional().describe("The created custom field options."),
}).describe("A list of custom field options for a context.")

export const createCustomFieldOption = pikkuSessionlessFunc({
  description: "Creates options and, where the custom select field is of the type Select List (cascading), cascading options for a custom select field. The options are added to a context of the field.\n\nThe maximum number of options that can be created per request is 1000 and each field can have a maximum of 10000 options.\n\nThis operation works for custom field options created in Jira or the operations from this resource. **To work with issue field select list options created for Connect apps use the [Issue custom field options (apps)](#api-group-issue-custom-field-options--apps-) operations.**\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: CreateCustomFieldOptionInput,
  output: CreateCustomFieldOptionOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/field/{fieldId}/context/{contextId}/option", data) as any
  },
})
