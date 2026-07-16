// App migration — This resource supports [app migrations](https://developer.atlassian.com/platform/app-migration/). Use it to: - [to request migrated workflow rules details](https://developer.atlassian.com/platform/app-migration/tutorials/migration-app-workflow-rules/). - [perform bulk updates of entity properties](https://developer.atlassian.com/platform/app-migration/tutorials/entity-properties-bulk-api/). - [perform bulk updates of issue custom field values](https://developer.atlassian.com/platform/app-migration/tutorials/migrating-app-custom-fields/).

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, ForbiddenError } from '@pikku/core/errors'

export const AppIssueFieldValueUpdateResourceUpdateIssueFieldsPutInput = z.object({
  "Atlassian-Transfer-Id": z.string().uuid().describe("The ID of the transfer."),
  updateValueList: z.array(z.object({
  _type: z.enum(["StringIssueField", "NumberIssueField", "RichTextIssueField", "SingleSelectIssueField", "MultiSelectIssueField", "TextIssueField"]).describe("The type of custom field."),
  fieldID: z.number().int().describe("The custom field ID."),
  issueID: z.number().int().describe("The issue ID."),
  number: z.number().optional().describe("The value of number type custom field when `_type` is `NumberIssueField`."),
  optionID: z.string().optional().describe("The value of single select and multiselect custom field type when `_type` is `SingleSelectIssueField` or `MultiSelectIssueField`."),
  richText: z.string().optional().describe("The value of richText type custom field when `_type` is `RichTextIssueField`."),
  string: z.string().optional().describe("The value of string type custom field when `_type` is `StringIssueField`."),
  text: z.string().optional().describe("The value of of text custom field type when `_type` is `TextIssueField`."),
})).optional().describe("The list of custom field update details."),
})

export const AppIssueFieldValueUpdateResourceUpdateIssueFieldsPutOutput = z.unknown()

export const appIssueFieldValueUpdateResourceUpdateIssueFieldsPut = pikkuSessionlessFunc({
  description: "Updates the value of a custom field added by Connect apps on one or more issues.\nThe values of up to 200 custom fields can be updated.\n\n**[Permissions](#permissions) required:** Only Connect apps can make this request.",
  input: AppIssueFieldValueUpdateResourceUpdateIssueFieldsPutInput,
  output: AppIssueFieldValueUpdateResourceUpdateIssueFieldsPutOutput,
  errors: [BadRequestError, ForbiddenError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/atlassian-connect/1/migration/field", data) as any
  },
})
