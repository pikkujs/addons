// Project roles — This resource represents the roles that users can play in projects. Use this resource to get, create, update, and delete project roles.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const GetProjectRoleDetailsInput = z.object({
  projectIdOrKey: z.string().describe("The project ID or project key (case sensitive)."),
  currentMember: z.boolean().optional().default(false).describe("Whether the roles should be filtered to include only those the user is assigned to."),
  excludeConnectAddons: z.boolean().optional().default(false),
})

export const GetProjectRoleDetailsOutput = z.array(z.object({
  admin: z.boolean().optional().describe("Whether this role is the admin role for the project."),
  default: z.boolean().optional().describe("Whether this role is the default role for the project."),
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

export const getProjectRoleDetails = pikkuSessionlessFunc({
  description: "Returns all [project roles](https://confluence.atlassian.com/x/3odKLg) and the details for each role. Note that the list of project roles is common to all projects.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) or *Administer projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.",
  input: GetProjectRoleDetailsInput,
  output: GetProjectRoleDetailsOutput,
  errors: [UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/project/{projectIdOrKey}/roledetails", data) as any
  },
})
