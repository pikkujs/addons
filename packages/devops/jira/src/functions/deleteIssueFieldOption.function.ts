// Issue custom field options (apps) — This resource represents custom issue field select list options created by a Connect app. See [Issue custom field options](#api-group-Issue-custom-field-options) to manipulate options created in Jira or using the REST API. A select list issue field is a type of [issue field](https://developer.atlassian.com/cloud/jira/platform/modules/issue-field/) that enables a user to select an option from a list. Use it to add, remove, and update the options of a select list issue field.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { ForbiddenError, NotFoundError, ConflictError } from '@pikku/core/errors'

export const DeleteIssueFieldOptionInput = z.object({
  fieldKey: z.string().describe("The field key is specified in the following format: **$(app-key)\\_\\_$(field-key)**. For example, *example-add-on\\_\\_example-issue-field*. To determine the `fieldKey` value, do one of the following:\n\n *  open the app's plugin descriptor, then **app-key** is the key at the top and **field-key** is the key in the `jiraIssueFields` module. **app-key** can also be found in the app listing in the Atlassian Universal Plugin Manager.\n *  run [Get fields](#api-rest-api-3-field-get) and in the field details the value is returned in `key`. For example, `\"key\": \"teams-add-on__team-issue-field\"`"),
  optionId: z.number().int().describe("The ID of the option to be deleted."),
})

export const DeleteIssueFieldOptionOutput = z.unknown()

export const deleteIssueFieldOption = pikkuSessionlessFunc({
  description: "Deletes an option from a select list issue field.\n\nNote that this operation **only works for issue field select list options added by Connect apps**, it cannot be used with issue field select list options created in Jira or using operations from the [Issue custom field options](#api-group-Issue-custom-field-options) resource.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are not required for the app providing the field.",
  input: DeleteIssueFieldOptionInput,
  output: DeleteIssueFieldOptionOutput,
  errors: [ForbiddenError, NotFoundError, ConflictError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/field/{fieldKey}/option/{optionId}", data) as any
  },
})
