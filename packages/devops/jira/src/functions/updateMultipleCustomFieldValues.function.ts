// Issue custom field values (apps) — This resource represents the values of custom fields added by [Forge apps](https://developer.atlassian.com/platform/forge/). Use it to update the value of a custom field on issues.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const UpdateMultipleCustomFieldValuesInput = z.object({
  generateChangelog: z.boolean().optional().default(true).describe("Whether to generate a changelog for this update."),
  updates: z.array(z.object({
  customField: z.string().describe("The ID or key of the custom field. For example, `customfield_10010`."),
  issueIds: z.array(z.number().int()).describe("The list of issue IDs."),
  value: z.unknown().describe("The value for the custom field. The value must be compatible with the [custom field type](https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field/#data-types) as follows:\n\n *  `string` the value must be a string.\n *  `number` the value must be a number.\n *  `datetime` the value must be a string that represents a date in the ISO format or the simplified extended ISO format. For example, `\"2023-01-18T12:00:00-03:00\"` or `\"2023-01-18T12:00:00.000Z\"`. However, the milliseconds part is ignored.\n *  `user` the value must be an object that contains the `accountId` field.\n *  `group` the value must be an object that contains the group `name` or `groupId` field. Because group names can change, we recommend using `groupId`.\n\nA list of appropriate values must be provided if the field is of the `list` [collection type](https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field/#collection-types)."),
})).optional(),
})

export const UpdateMultipleCustomFieldValuesOutput = z.unknown()

export const updateMultipleCustomFieldValues = pikkuSessionlessFunc({
  description: "Updates the value of one or more custom fields on one or more issues. Combinations of custom field and issue should be unique within the request. Custom fields can only be updated by the Forge app that created them.\n\n**[Permissions](#permissions) required:** Only the app that created the custom field can update its values with this operation.",
  input: UpdateMultipleCustomFieldValuesInput,
  output: UpdateMultipleCustomFieldValuesOutput,
  errors: [BadRequestError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/app/field/value", data) as any
  },
})
