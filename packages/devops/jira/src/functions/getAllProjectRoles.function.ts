// Project roles — This resource represents the roles that users can play in projects. Use this resource to get, create, update, and delete project roles.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const GetAllProjectRolesOutput = z.array(z.object({
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
}))

export const getAllProjectRoles = pikkuSessionlessFunc({
  description: "Gets a list of all project roles, complete with project role details and default actors.\n\n### About project roles ###\n\n[Project roles](https://confluence.atlassian.com/x/3odKLg) are a flexible way to to associate users and groups with projects. In Jira Cloud, the list of project roles is shared globally with all projects, but each project can have a different set of actors associated with it (unlike groups, which have the same membership throughout all Jira applications).\n\nProject roles are used in [permission schemes](#api-rest-api-3-permissionscheme-get), [email notification schemes](#api-rest-api-3-notificationscheme-get), [issue security levels](#api-rest-api-3-issuesecurityschemes-get), [comment visibility](#api-rest-api-3-comment-list-post), and workflow conditions.\n\n#### Members and actors ####\n\nIn the Jira REST API, a member of a project role is called an *actor*. An *actor* is a group or user associated with a project role.\n\nActors may be set as [default members](https://confluence.atlassian.com/x/3odKLg#Managingprojectroles-Specifying'defaultmembers'foraprojectrole) of the project role or set at the project level:\n\n *  Default actors: Users and groups that are assigned to the project role for all newly created projects. The default actors can be removed at the project level later if desired.\n *  Actors: Users and groups that are associated with a project role for a project, which may differ from the default actors. This enables you to assign a user to different roles in different projects.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  output: GetAllProjectRolesOutput,
  errors: [UnauthorizedError, ForbiddenError],
  func: async ({ jira }) => {
    return jira.call("GET", "/rest/api/3/role") as any
  },
})
