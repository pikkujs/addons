// Issue type properties — This resource represents [issue type](#api-group-Issue-types) properties, which provides for storing custom data against an issue type. Use it to get, create, and delete issue type properties as well as obtain the keys of all properties on a issues type. Issue type properties are a type of [entity property](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/).

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, NotFoundError } from '@pikku/core/errors'

export const GetIssueTypePropertyKeysInput = z.object({
  issueTypeId: z.string().describe("The ID of the issue type."),
})

export const GetIssueTypePropertyKeysOutput = z.object({
  keys: z.array(z.object({
    key: z.string().optional().describe("The key of the property."),
    self: z.string().optional().describe("The URL of the property."),
  })).optional().describe("Property key details."),
}).describe("List of property keys.")

export const getIssueTypePropertyKeys = pikkuSessionlessFunc({
  description: "Returns all the [issue type property](https://developer.atlassian.com/cloud/jira/platform/storing-data-without-a-database/#a-id-jira-entity-properties-a-jira-entity-properties) keys of the issue type.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:**\n\n *  *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) to get the property keys of any issue type.\n *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) to get the property keys of any issue types associated with the projects the user has permission to browse.",
  input: GetIssueTypePropertyKeysInput,
  output: GetIssueTypePropertyKeysOutput,
  errors: [BadRequestError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/issuetype/{issueTypeId}/properties", data) as any
  },
})
