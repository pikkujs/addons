// Issue custom field options — This resource represents custom issue field select list options created in Jira or using the REST API. This resource supports the following field types: * Checkboxes. * Radio Buttons. * Select List (single choice). * Select List (multiple choices). * Select List (cascading). See [Issue custom field options (apps)](#api-group-Issue-custom-field-options--apps-) to manipulate custom issue field select list options created by a Connect app. Use it to retrieve, create, update, order, and delete custom field options.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const ReorderCustomFieldOptionsInput = z.object({
  fieldId: z.string().describe("The ID of the custom field."),
  contextId: z.number().int().describe("The ID of the context."),
  after: z.string().optional().describe("The ID of the custom field option or cascading option to place the moved options after. Required if `position` isn't provided."),
  customFieldOptionIds: z.array(z.string()).describe("A list of IDs of custom field options to move. The order of the custom field option IDs in the list is the order they are given after the move. The list must contain custom field options or cascading options, but not both."),
  position: z.enum(["First", "Last"]).optional().describe("The position the custom field options should be moved to. Required if `after` isn't provided."),
})

export const ReorderCustomFieldOptionsOutput = z.unknown()

export const reorderCustomFieldOptions = pikkuSessionlessFunc({
  description: "Changes the order of custom field options or cascading options in a context.\n\nThis operation works for custom field options created in Jira or the operations from this resource. **To work with issue field select list options created for Connect apps use the [Issue custom field options (apps)](#api-group-issue-custom-field-options--apps-) operations.**\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: ReorderCustomFieldOptionsInput,
  output: ReorderCustomFieldOptionsOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/field/{fieldId}/context/{contextId}/option/move", data) as any
  },
})
