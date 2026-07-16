// Project properties — This resource represents [project](#api-group-Projects) properties, which provides for storing custom data against a project. Use it to get, create, and delete project properties as well as get a list of property keys for a project. Project properties are a type of [entity property](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/).

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const GetProjectPropertyInput = z.object({
  projectIdOrKey: z.string().describe("The project ID or project key (case sensitive)."),
  propertyKey: z.string().describe("The project property key. Use [Get project property keys](#api-rest-api-3-project-projectIdOrKey-properties-get) to get a list of all project property keys."),
})

export const GetProjectPropertyOutput = z.object({
  key: z.string().optional().describe("The key of the property. Required on create and update."),
  value: z.unknown().optional().describe("The value of the property. Required on create and update."),
}).describe("An entity property, for more information see [Entity properties](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/).")

export const getProjectProperty = pikkuSessionlessFunc({
  description: "Returns the value of a [project property](https://developer.atlassian.com/cloud/jira/platform/storing-data-without-a-database/#a-id-jira-entity-properties-a-jira-entity-properties).\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** *Browse Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the property.",
  input: GetProjectPropertyInput,
  output: GetProjectPropertyOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/project/{projectIdOrKey}/properties/{propertyKey}", data) as any
  },
})
