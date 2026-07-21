// Application roles — This resource represents application roles. Use it to get details of an application role or all application roles.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const GetAllApplicationRolesOutput = z.array(z.object({
  defaultGroups: z.array(z.string()).optional().describe("The groups that are granted default access for this application role. As a group's name can change, use of `defaultGroupsDetails` is recommended to identify a groups."),
  defaultGroupsDetails: z.array(z.object({
    groupId: z.string().nullable().optional().describe("The ID of the group, which uniquely identifies the group across all Atlassian products. For example, *952d12c3-5b5b-4d04-bb32-44d383afc4b2*."),
    name: z.string().optional().describe("The name of group."),
    self: z.string().url().optional().describe("The URL for these group details."),
  })).optional().describe("The groups that are granted default access for this application role."),
  defined: z.boolean().optional().describe("Deprecated."),
  groupDetails: z.array(z.object({
    groupId: z.string().nullable().optional().describe("The ID of the group, which uniquely identifies the group across all Atlassian products. For example, *952d12c3-5b5b-4d04-bb32-44d383afc4b2*."),
    name: z.string().optional().describe("The name of group."),
    self: z.string().url().optional().describe("The URL for these group details."),
  })).optional().describe("The groups associated with the application role."),
  groups: z.array(z.string()).optional().describe("The groups associated with the application role. As a group's name can change, use of `groupDetails` is recommended to identify a groups."),
  hasUnlimitedSeats: z.boolean().optional(),
  key: z.string().optional().describe("The key of the application role."),
  name: z.string().optional().describe("The display name of the application role."),
  numberOfSeats: z.number().int().optional().describe("The maximum count of users on your license."),
  platform: z.boolean().optional().describe("Indicates if the application role belongs to Jira platform (`jira-core`)."),
  remainingSeats: z.number().int().optional().describe("The count of users remaining on your license."),
  selectedByDefault: z.boolean().optional().describe("Determines whether this application role should be selected by default on user creation."),
  userCount: z.number().int().optional().describe("The number of users counting against your license."),
  userCountDescription: z.string().optional().describe("The [type of users](https://confluence.atlassian.com/x/lRW3Ng) being counted against your license."),
}))

export const getAllApplicationRoles = pikkuSessionlessFunc({
  description: "Returns all application roles. In Jira, application roles are managed using the [Application access configuration](https://confluence.atlassian.com/x/3YxjL) page.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  output: GetAllApplicationRolesOutput,
  errors: [UnauthorizedError, ForbiddenError],
  func: async ({ jira }) => {
    return jira.call("GET", "/rest/api/3/applicationrole") as any
  },
})
