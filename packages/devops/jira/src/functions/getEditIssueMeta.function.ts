// Issues — This resource represents Jira issues. Use it to: * create or edit issues, individually or in bulk. * retrieve metadata about the options for creating or editing issues. * delete an issue. * assign a user to an issue. * get issue changelogs. * send notifications about an issue. * get details of the transitions available for an issue. * transition an issue.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const GetEditIssueMetaInput = z.object({
  issueIdOrKey: z.string().describe("The ID or key of the issue."),
  overrideScreenSecurity: z.boolean().optional().default(false).describe("Whether hidden fields are returned. Available to Connect app users with *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) and Forge apps acting on behalf of users with *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg)."),
  overrideEditableFlag: z.boolean().optional().default(false).describe("Whether non-editable fields are returned. Available to Connect app users with *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) and Forge apps acting on behalf of users with *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg)."),
})

export const GetEditIssueMetaOutput = z.object({
  fields: z.record(z.string(), z.object({
    allowedValues: z.array(z.unknown()).optional().describe("The list of values allowed in the field."),
    autoCompleteUrl: z.string().optional().describe("The URL that can be used to automatically complete the field."),
    configuration: z.record(z.string(), z.unknown()).optional().describe("The configuration properties."),
    defaultValue: z.unknown().optional().describe("The default value of the field."),
    hasDefaultValue: z.boolean().optional().describe("Whether the field has a default value."),
    key: z.string().describe("The key of the field."),
    name: z.string().describe("The name of the field."),
    operations: z.array(z.string()).describe("The list of operations that can be performed on the field."),
    required: z.boolean().describe("Whether the field is required."),
    schema: z.object({
      configuration: z.record(z.string(), z.unknown()).optional().describe("If the field is a custom field, the configuration of the field."),
      custom: z.string().optional().describe("If the field is a custom field, the URI of the field."),
      customId: z.number().int().optional().describe("If the field is a custom field, the custom ID of the field."),
      items: z.string().optional().describe("When the data type is an array, the name of the field items within the array."),
      system: z.string().optional().describe("If the field is a system field, the name of the field."),
      type: z.string().describe("The data type of the field."),
    }).describe("The data type of the field."),
  }).describe("The metadata describing an issue field.")).optional(),
}).describe("A list of editable field details.")

export const getEditIssueMeta = pikkuSessionlessFunc({
  description: "Returns the edit screen fields for an issue that are visible to and editable by the user. Use the information to populate the requests in [Edit issue](#api-rest-api-3-issue-issueIdOrKey-put).\n\nThis endpoint will check for these conditions:\n\n1.  Field is available on a field screen - through screen, screen scheme, issue type screen scheme, and issue type scheme configuration. `overrideScreenSecurity=true` skips this condition.\n2.  Field is visible in the [field configuration](https://support.atlassian.com/jira-cloud-administration/docs/change-a-field-configuration/). `overrideScreenSecurity=true` skips this condition.\n3.  Field is shown on the issue: each field has different conditions here. For example: Attachment field only shows if attachments are enabled. Assignee only shows if user has permissions to assign the issue.\n4.  If a field is custom then it must have valid custom field context, applicable for its project and issue type. All system fields are assumed to have context in all projects and all issue types.\n5.  Issue has a project, issue type, and status defined.\n6.  Issue is assigned to a valid workflow, and the current status has assigned a workflow step. `overrideEditableFlag=true` skips this condition.\n7.  The current workflow step is editable. This is true by default, but [can be disabled by setting](https://support.atlassian.com/jira-cloud-administration/docs/use-workflow-properties/) the `jira.issue.editable` property to `false`. `overrideEditableFlag=true` skips this condition.\n8.  User has [Edit issues permission](https://support.atlassian.com/jira-cloud-administration/docs/permissions-for-company-managed-projects/).\n9.  Workflow permissions allow editing a field. This is true by default but [can be modified](https://support.atlassian.com/jira-cloud-administration/docs/use-workflow-properties/) using `jira.permission.*` workflow properties.\n\nFields hidden using [Issue layout settings page](https://support.atlassian.com/jira-software-cloud/docs/configure-field-layout-in-the-issue-view/) remain editable.\n\nConnect apps having an app user with *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg), and Forge apps acting on behalf of users with *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg), can return additional details using:\n\n *  `overrideScreenSecurity` When this flag is `true`, then this endpoint skips checking if fields are available through screens, and field configuration (conditions 1. and 2. from the list above).\n *  `overrideEditableFlag` When this flag is `true`, then this endpoint skips checking if workflow is present and if the current step is editable (conditions 6. and 7. from the list above).\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:**\n\n *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is in.\n *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.\n\nNote: For any fields to be editable the user must have the *Edit issues* [project permission](https://confluence.atlassian.com/x/yodKLg) for the issue.",
  input: GetEditIssueMetaInput,
  output: GetEditIssueMetaOutput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/issue/{issueIdOrKey}/editmeta", data) as any
  },
})
