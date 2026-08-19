// Project versions — This resource represents project versions. Use it to get, get lists of, create, update, move, merge, and delete project versions. This resource also provides counts of issues by version.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const GetVersionRelatedIssuesInput = z.object({
  id: z.string().describe("The ID of the version."),
})

export const GetVersionRelatedIssuesOutput = z.object({
  customFieldUsage: z.array(z.object({
    customFieldId: z.number().int().optional().describe("The ID of the custom field."),
    fieldName: z.string().optional().describe("The name of the custom field."),
    issueCountWithVersionInCustomField: z.number().int().optional().describe("Count of the issues where the custom field contains the version."),
  })).optional().describe("List of custom fields using the version."),
  issueCountWithCustomFieldsShowingVersion: z.number().int().optional().describe("Count of issues where a version custom field is set to the version."),
  issuesAffectedCount: z.number().int().optional().describe("Count of issues where the `affectedVersion` is set to the version."),
  issuesFixedCount: z.number().int().optional().describe("Count of issues where the `fixVersion` is set to the version."),
  self: z.string().url().optional().describe("The URL of these count details."),
}).describe("Various counts of issues within a version.")

export const getVersionRelatedIssues = pikkuSessionlessFunc({
  description: "Returns the following counts for a version:\n\n *  Number of issues where the `fixVersion` is set to the version.\n *  Number of issues where the `affectedVersion` is set to the version.\n *  Number of issues where a version custom field is set to the version.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** *Browse projects* project permission for the project that contains the version.",
  input: GetVersionRelatedIssuesInput,
  output: GetVersionRelatedIssuesOutput,
  errors: [UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/version/{id}/relatedIssueCounts", data) as any
  },
})
