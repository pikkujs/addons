// Issue type properties — This resource represents [issue type](#api-group-Issue-types) properties, which provides for storing custom data against an issue type. Use it to get, create, and delete issue type properties as well as obtain the keys of all properties on a issues type. Issue type properties are a type of [entity property](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/).

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const GetIssueTypePropertyInput = z.object({
  issueTypeId: z.string().describe("The ID of the issue type."),
  propertyKey: z.string().describe("The key of the property. Use [Get issue type property keys](#api-rest-api-3-issuetype-issueTypeId-properties-get) to get a list of all issue type property keys."),
})

export const GetIssueTypePropertyOutput = z.object({
  key: z.string().optional().describe("The key of the property. Required on create and update."),
  value: z.unknown().optional().describe("The value of the property. Required on create and update."),
}).describe("An entity property, for more information see [Entity properties](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/).")

export const getIssueTypeProperty = pikkuSessionlessFunc({
  description: "Returns the key and value of the [issue type property](https://developer.atlassian.com/cloud/jira/platform/storing-data-without-a-database/#a-id-jira-entity-properties-a-jira-entity-properties).\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:**\n\n *  *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) to get the details of any issue type.\n *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) to get the details of any issue types associated with the projects the user has permission to browse.",
  input: GetIssueTypePropertyInput,
  output: GetIssueTypePropertyOutput,
  errors: [BadRequestError, UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/issuetype/{issueTypeId}/properties/{propertyKey}", data) as any
  },
})
