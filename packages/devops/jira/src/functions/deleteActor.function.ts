// Project role actors — This resource represents the users assigned to [project roles](#api-group-Issue-comments). Use it to get, add, and remove default users from project roles. Also use it to add and remove users from a project role associated with a project.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, NotFoundError } from '@pikku/core/errors'

export const DeleteActorInput = z.object({
  projectIdOrKey: z.string().describe("The project ID or project key (case sensitive)."),
  id: z.number().int().describe("The ID of the project role. Use [Get all project roles](#api-rest-api-3-role-get) to get a list of project role IDs."),
  user: z.string().optional().describe("The user account ID of the user to remove from the project role."),
  group: z.string().optional().describe("The name of the group to remove from the project role. This parameter cannot be used with the `groupId` parameter. As a group's name can change, use of `groupId` is recommended."),
  groupId: z.string().optional().describe("The ID of the group to remove from the project role. This parameter cannot be used with the `group` parameter."),
})

export const deleteActor = pikkuSessionlessFunc({
  description: "Deletes actors from a project role for the project.\n\nTo remove default actors from the project role, use [Delete default actors from project role](#api-rest-api-3-role-id-actors-delete).\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** *Administer Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project or *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: DeleteActorInput,
  errors: [BadRequestError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/project/{projectIdOrKey}/role/{id}", data)
  },
})
