// Project roles — This resource represents the roles that users can play in projects. Use this resource to get, create, update, and delete project roles.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const GetProjectRolesInput = z.object({
  projectIdOrKey: z.string().describe("The project ID or project key (case sensitive)."),
})

export const GetProjectRolesOutput = z.record(z.string(), z.string().url())

export const getProjectRoles = pikkuSessionlessFunc({
  description: "Returns a list of [project roles](https://confluence.atlassian.com/x/3odKLg) for the project returning the name and self URL for each role.\n\nNote that all project roles are shared with all projects in Jira Cloud. See [Get all project roles](#api-rest-api-3-role-get) for more information.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** *Administer Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for any project on the site or *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: GetProjectRolesInput,
  output: GetProjectRolesOutput,
  errors: [UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/project/{projectIdOrKey}/role", data) as any
  },
})
