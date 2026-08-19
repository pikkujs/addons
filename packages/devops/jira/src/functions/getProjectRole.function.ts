// Project roles — This resource represents the roles that users can play in projects. Use this resource to get, create, update, and delete project roles.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const GetProjectRoleInput = z.object({
  projectIdOrKey: z.string().describe("The project ID or project key (case sensitive)."),
  id: z.number().int().describe("The ID of the project role. Use [Get all project roles](#api-rest-api-3-role-get) to get a list of project role IDs."),
  excludeInactiveUsers: z.boolean().optional().default(false).describe("Exclude inactive users."),
})

export const GetProjectRoleOutput = z.object({
  actors: z.array(z.object({
    actorGroup: z.object({
      displayName: z.string().optional().describe("The display name of the group."),
      groupId: z.string().optional().describe("The ID of the group."),
      name: z.string().optional().describe("The name of the group. As a group's name can change, use of `groupId` is recommended to identify the group."),
    }).optional(),
    actorUser: z.object({
      accountId: z.string().max(128).optional().describe("The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. Returns *unknown* if the record is deleted and corrupted, for example, as the result of a server import."),
    }).optional(),
    avatarUrl: z.string().url().optional().describe("The avatar of the role actor."),
    displayName: z.string().optional().describe("The display name of the role actor. For users, depending on the user’s privacy setting, this may return an alternative value for the user's name."),
    id: z.number().int().optional().describe("The ID of the role actor."),
    name: z.string().optional().describe("This property is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details."),
    type: z.enum(["atlassian-group-role-actor", "atlassian-user-role-actor"]).optional().describe("The type of role actor."),
  })).optional().describe("The list of users who act in this role."),
  admin: z.boolean().optional().describe("Whether this role is the admin role for the project."),
  currentUserRole: z.boolean().optional().describe("Whether the calling user is part of this role."),
  default: z.boolean().optional().describe("Whether this role is the default role for the project"),
  description: z.string().optional().describe("The description of the project role."),
  id: z.number().int().optional().describe("The ID of the project role."),
  name: z.string().optional().describe("The name of the project role."),
  roleConfigurable: z.boolean().optional().describe("Whether the roles are configurable for this project."),
  scope: z.object({
    project: z.object({
      avatarUrls: z.object({
        "16x16": z.string().url().optional().describe("The URL of the item's 16x16 pixel avatar."),
        "24x24": z.string().url().optional().describe("The URL of the item's 24x24 pixel avatar."),
        "32x32": z.string().url().optional().describe("The URL of the item's 32x32 pixel avatar."),
        "48x48": z.string().url().optional().describe("The URL of the item's 48x48 pixel avatar."),
      }).optional().describe("The URLs of the project's avatars."),
      id: z.string().optional().describe("The ID of the project."),
      key: z.string().optional().describe("The key of the project."),
      name: z.string().optional().describe("The name of the project."),
      projectCategory: z.object({
        description: z.string().optional().describe("The name of the project category."),
        id: z.string().optional().describe("The ID of the project category."),
        name: z.string().optional().describe("The description of the project category."),
        self: z.string().optional().describe("The URL of the project category."),
      }).optional().describe("The category the project belongs to."),
      projectTypeKey: z.enum(["software", "service_desk", "business"]).optional().describe("The [project type](https://confluence.atlassian.com/x/GwiiLQ#Jiraapplicationsoverview-Productfeaturesandprojecttypes) of the project."),
      self: z.string().optional().describe("The URL of the project details."),
      simplified: z.boolean().optional().describe("Whether or not the project is simplified."),
    }).optional().describe("The project the item has scope in."),
    type: z.enum(["PROJECT", "TEMPLATE"]).optional().describe("The type of scope."),
  }).optional().describe("The scope of the role. Indicated for roles associated with [next-gen projects](https://confluence.atlassian.com/x/loMyO)."),
  self: z.string().url().optional().describe("The URL the project role details."),
  translatedName: z.string().optional().describe("The translated name of the project role."),
}).describe("Details about the roles in a project.")

export const getProjectRole = pikkuSessionlessFunc({
  description: "Returns a project role's details and actors associated with the project. The list of actors is sorted by display name.\n\nTo check whether a user belongs to a role based on their group memberships, use [Get user](#api-rest-api-3-user-get) with the `groups` expand parameter selected. Then check whether the user keys and groups match with the actors returned for the project.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** *Administer Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project or *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: GetProjectRoleInput,
  output: GetProjectRoleOutput,
  errors: [BadRequestError, UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/project/{projectIdOrKey}/role/{id}", data) as any
  },
})
