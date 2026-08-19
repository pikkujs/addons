// Issue custom field values (apps) — This resource represents the values of custom fields added by [Forge apps](https://developer.atlassian.com/platform/forge/). Use it to update the value of a custom field on issues.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const UpdateCustomFieldValueInput = z.object({
  fieldIdOrKey: z.string().describe("The ID or key of the custom field. For example, `customfield_10010`."),
  generateChangelog: z.boolean().optional().default(true).describe("Whether to generate a changelog for this update."),
  updates: z.array(z.object({
  issueIds: z.array(z.number().int()).describe("The list of issue IDs."),
  value: z.unknown().describe("The value for the custom field. The value must be compatible with the [custom field type](https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field/#data-types) as follows:\n\n *  `string` the value must be a string.\n *  `number` the value must be a number.\n *  `datetime` the value must be a string that represents a date in the ISO format or the simplified extended ISO format. For example, `\"2023-01-18T12:00:00-03:00\"` or `\"2023-01-18T12:00:00.000Z\"`. However, the milliseconds part is ignored.\n *  `user` the value must be an object that contains the `accountId` field.\n *  `group` the value must be an object that contains the group `name` or `groupId` field. Because group names can change, we recommend using `groupId`.\n\nA list of appropriate values must be provided if the field is of the `list` [collection type](https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field/#collection-types)."),
})).optional().describe("The list of custom field update details."),
})

export const UpdateCustomFieldValueOutput = z.unknown()

export const updateCustomFieldValue = pikkuSessionlessFunc({
  description: "Updates the value of a custom field on one or more issues. Custom fields can only be updated by the Forge app that created them.\n\n**[Permissions](#permissions) required:** Only the app that created the custom field can update its values with this operation.",
  input: UpdateCustomFieldValueInput,
  output: UpdateCustomFieldValueOutput,
  errors: [BadRequestError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/app/field/{fieldIdOrKey}/value", data) as any
  },
})
