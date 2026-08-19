// Issue custom field options (apps) — This resource represents custom issue field select list options created by a Connect app. See [Issue custom field options](#api-group-Issue-custom-field-options) to manipulate options created in Jira or using the REST API. A select list issue field is a type of [issue field](https://developer.atlassian.com/cloud/jira/platform/modules/issue-field/) that enables a user to select an option from a list. Use it to add, remove, and update the options of a select list issue field.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const ReplaceIssueFieldOptionInput = z.object({
  fieldKey: z.string().describe("The field key is specified in the following format: **$(app-key)\\_\\_$(field-key)**. For example, *example-add-on\\_\\_example-issue-field*. To determine the `fieldKey` value, do one of the following:\n\n *  open the app's plugin descriptor, then **app-key** is the key at the top and **field-key** is the key in the `jiraIssueFields` module. **app-key** can also be found in the app listing in the Atlassian Universal Plugin Manager.\n *  run [Get fields](#api-rest-api-3-field-get) and in the field details the value is returned in `key`. For example, `\"key\": \"teams-add-on__team-issue-field\"`"),
  optionId: z.number().int().describe("The ID of the option to be deselected."),
  replaceWith: z.number().int().optional().describe("The ID of the option that will replace the currently selected option."),
  jql: z.string().optional().describe("A JQL query that specifies the issues to be updated. For example, *project=10000*."),
  overrideScreenSecurity: z.boolean().optional().default(false).describe("Whether screen security is overridden to enable hidden fields to be edited. Available to Connect and Forge app users with admin permission."),
  overrideEditableFlag: z.boolean().optional().default(false).describe("Whether screen security is overridden to enable uneditable fields to be edited. Available to Connect and Forge app users with *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg)."),
})

export const replaceIssueFieldOption = pikkuSessionlessFunc({
  description: "Deselects an issue-field select-list option from all issues where it is selected. A different option can be selected to replace the deselected option. The update can also be limited to a smaller set of issues by using a JQL query.\n\nConnect and Forge app users with *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) can override the screen security configuration using `overrideScreenSecurity` and `overrideEditableFlag`.\n\nThis is an [asynchronous operation](#async). The response object contains a link to the long-running task.\n\nNote that this operation **only works for issue field select list options added by Connect apps**, it cannot be used with issue field select list options created in Jira or using operations from the [Issue custom field options](#api-group-Issue-custom-field-options) resource.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are not required for the app providing the field.",
  input: ReplaceIssueFieldOptionInput,
  errors: [BadRequestError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/field/{fieldKey}/option/{optionId}/issue", data)
  },
})
