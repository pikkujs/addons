// Issue properties — This resource represents [issue](#api-group-Issues) properties, which provides for storing custom data against an issue. Use it to get, set, and delete issue properties as well as obtain details of all properties on an issue. Operations to bulk update and delete issue properties are also provided. Issue properties are a type of [entity property](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/).

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError } from '@pikku/core/errors'

export const GetIssuePropertyKeysInput = z.object({
  issueIdOrKey: z.string().describe("The key or ID of the issue."),
})

export const GetIssuePropertyKeysOutput = z.object({
  keys: z.array(z.object({
    key: z.string().optional().describe("The key of the property."),
    self: z.string().optional().describe("The URL of the property."),
  })).optional().describe("Property key details."),
}).describe("List of property keys.")

export const getIssuePropertyKeys = pikkuSessionlessFunc({
  description: "Returns the URLs and keys of an issue's properties.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** Property details are only returned where the user has:\n\n *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the issue.\n *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.",
  input: GetIssuePropertyKeysInput,
  output: GetIssuePropertyKeysOutput,
  errors: [NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/issue/{issueIdOrKey}/properties", data) as any
  },
})
