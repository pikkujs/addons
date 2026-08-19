// Issue custom field options — This resource represents custom issue field select list options created in Jira or using the REST API. This resource supports the following field types: * Checkboxes. * Radio Buttons. * Select List (single choice). * Select List (multiple choices). * Select List (cascading). See [Issue custom field options (apps)](#api-group-Issue-custom-field-options--apps-) to manipulate custom issue field select list options created by a Connect app. Use it to retrieve, create, update, order, and delete custom field options.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const DeleteCustomFieldOptionInput = z.object({
  fieldId: z.string().describe("The ID of the custom field."),
  contextId: z.number().int().describe("The ID of the context from which an option should be deleted."),
  optionId: z.number().int().describe("The ID of the option to delete."),
})

export const deleteCustomFieldOption = pikkuSessionlessFunc({
  description: "Deletes a custom field option.\n\nOptions with cascading options cannot be deleted without deleting the cascading options first.\n\nThis operation works for custom field options created in Jira or the operations from this resource. **To work with issue field select list options created for Connect apps use the [Issue custom field options (apps)](#api-group-issue-custom-field-options--apps-) operations.**\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: DeleteCustomFieldOptionInput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/field/{fieldId}/context/{contextId}/option/{optionId}", data)
  },
})
