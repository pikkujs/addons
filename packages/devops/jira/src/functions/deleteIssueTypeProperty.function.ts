// Issue type properties — This resource represents [issue type](#api-group-Issue-types) properties, which provides for storing custom data against an issue type. Use it to get, create, and delete issue type properties as well as obtain the keys of all properties on a issues type. Issue type properties are a type of [entity property](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/).

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const DeleteIssueTypePropertyInput = z.object({
  issueTypeId: z.string().describe("The ID of the issue type."),
  propertyKey: z.string().describe("The key of the property. Use [Get issue type property keys](#api-rest-api-3-issuetype-issueTypeId-properties-get) to get a list of all issue type property keys."),
})

export const deleteIssueTypeProperty = pikkuSessionlessFunc({
  description: "Deletes the [issue type property](https://developer.atlassian.com/cloud/jira/platform/storing-data-without-a-database/#a-id-jira-entity-properties-a-jira-entity-properties).\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: DeleteIssueTypePropertyInput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/issuetype/{issueTypeId}/properties/{propertyKey}", data)
  },
})
