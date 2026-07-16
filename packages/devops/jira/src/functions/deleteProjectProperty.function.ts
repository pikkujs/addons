// Project properties — This resource represents [project](#api-group-Projects) properties, which provides for storing custom data against a project. Use it to get, create, and delete project properties as well as get a list of property keys for a project. Project properties are a type of [entity property](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/).

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const DeleteProjectPropertyInput = z.object({
  projectIdOrKey: z.string().describe("The project ID or project key (case sensitive)."),
  propertyKey: z.string().describe("The project property key. Use [Get project property keys](#api-rest-api-3-project-projectIdOrKey-properties-get) to get a list of all project property keys."),
})

export const deleteProjectProperty = pikkuSessionlessFunc({
  description: "Deletes the [property](https://developer.atlassian.com/cloud/jira/platform/storing-data-without-a-database/#a-id-jira-entity-properties-a-jira-entity-properties) from a project.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) or *Administer Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the property.",
  input: DeleteProjectPropertyInput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/project/{projectIdOrKey}/properties/{propertyKey}", data)
  },
})
