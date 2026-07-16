// Issue types — This resource represents issues types. Use it to: * get, create, update, and delete issue types. * get all issue types for a user. * get alternative issue types. * set an avatar for an issue type.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const GetIssueTypesForProjectInput = z.object({
  projectId: z.number().int().describe("The ID of the project."),
  level: z.number().int().optional().describe("The level of the issue type to filter by. Use:\n\n *  `-1` for Subtask.\n *  `0` for Base.\n *  `1` for Epic."),
})

export const GetIssueTypesForProjectOutput = z.array(z.object({
  avatarId: z.number().int().optional().describe("The ID of the issue type's avatar."),
  description: z.string().optional().describe("The description of the issue type."),
  entityId: z.string().uuid().optional().describe("Unique ID for next-gen projects."),
  hierarchyLevel: z.number().int().optional().describe("Hierarchy level of the issue type."),
  iconUrl: z.string().optional().describe("The URL of the issue type's avatar."),
  id: z.string().optional().describe("The ID of the issue type."),
  name: z.string().optional().describe("The name of the issue type."),
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
  }).optional().describe("Details of the next-gen projects the issue type is available in."),
  self: z.string().optional().describe("The URL of these issue type details."),
  subtask: z.boolean().optional().describe("Whether this issue type is used to create subtasks."),
}))

export const getIssueTypesForProject = pikkuSessionlessFunc({
  description: "Returns issue types for a project.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) in the relevant project or *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: GetIssueTypesForProjectInput,
  output: GetIssueTypesForProjectOutput,
  errors: [BadRequestError, UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/issuetype/project", data) as any
  },
})
