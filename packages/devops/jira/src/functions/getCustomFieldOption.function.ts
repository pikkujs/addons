// Issue custom field options — This resource represents custom issue field select list options created in Jira or using the REST API. This resource supports the following field types: * Checkboxes. * Radio Buttons. * Select List (single choice). * Select List (multiple choices). * Select List (cascading). See [Issue custom field options (apps)](#api-group-Issue-custom-field-options--apps-) to manipulate custom issue field select list options created by a Connect app. Use it to retrieve, create, update, order, and delete custom field options.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const GetCustomFieldOptionInput = z.object({
  id: z.string().describe("The ID of the custom field option."),
})

export const GetCustomFieldOptionOutput = z.object({
  self: z.string().url().optional().describe("The URL of these custom field option details."),
  value: z.string().optional().describe("The value of the custom field option."),
}).describe("Details of a custom option for a field.")

export const getCustomFieldOption = pikkuSessionlessFunc({
  description: "Returns a custom field option. For example, an option in a select list.\n\nNote that this operation **only works for issue field select list options created in Jira or using operations from the [Issue custom field options](#api-group-Issue-custom-field-options) resource**, it cannot be used with issue field select list options created by Connect apps.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** The custom field option is returned as follows:\n\n *  if the user has the *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).\n *  if the user has the *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for at least one project the custom field is used in, and the field is visible in at least one layout the user has permission to view.",
  input: GetCustomFieldOptionInput,
  output: GetCustomFieldOptionOutput,
  errors: [UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/customFieldOption/{id}", data) as any
  },
})
