// Projects — This resource represents projects. Use it to get, create, update, and delete projects. Also get statuses available to a project, a project's notification schemes, and update a project's type.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const UpdateProjectInput = z.object({
  projectIdOrKey: z.string().describe("The project ID or project key (case sensitive)."),
  expand: z.string().optional().describe("Use [expand](#expansion) to include additional information in the response. This parameter accepts a comma-separated list. Note that the project description, issue types, and project lead are included in all responses by default. Expand options include:\n\n *  `description` The project description.\n *  `issueTypes` The issue types associated with the project.\n *  `lead` The project lead.\n *  `projectKeys` All project keys associated with the project."),
  assigneeType: z.enum(["PROJECT_LEAD", "UNASSIGNED"]).optional().describe("The default assignee when creating issues for this project."),
  avatarId: z.number().int().optional().describe("An integer value for the project's avatar."),
  categoryId: z.number().int().optional().describe("The ID of the project's category. A complete list of category IDs is found using the [Get all project categories](#api-rest-api-3-projectCategory-get) operation. To remove the project category from the project, set the value to `-1.`"),
  description: z.string().optional().describe("A brief description of the project."),
  issueSecurityScheme: z.number().int().optional().describe("The ID of the issue security scheme for the project, which enables you to control who can and cannot view issues. Use the [Get issue security schemes](#api-rest-api-3-issuesecurityschemes-get) resource to get all issue security scheme IDs."),
  key: z.string().optional().describe("Project keys must be unique and start with an uppercase letter followed by one or more uppercase alphanumeric characters. The maximum length is 10 characters."),
  lead: z.string().optional().describe("This parameter is deprecated because of privacy changes. Use `leadAccountId` instead. See the [migration guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. The user name of the project lead. Cannot be provided with `leadAccountId`."),
  leadAccountId: z.string().max(128).optional().describe("The account ID of the project lead. Cannot be provided with `lead`."),
  name: z.string().optional().describe("The name of the project."),
  notificationScheme: z.number().int().optional().describe("The ID of the notification scheme for the project. Use the [Get notification schemes](#api-rest-api-3-notificationscheme-get) resource to get a list of notification scheme IDs."),
  permissionScheme: z.number().int().optional().describe("The ID of the permission scheme for the project. Use the [Get all permission schemes](#api-rest-api-3-permissionscheme-get) resource to see a list of all permission scheme IDs."),
  url: z.string().optional().describe("A link to information about this project, such as project documentation"),
})

export const UpdateProjectOutput = z.any()

export const updateProject = pikkuSessionlessFunc({
  description: "Updates the [project details](https://confluence.atlassian.com/x/ahLpNw) of a project.\n\nAll parameters are optional in the body of the request.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: UpdateProjectInput,
  output: UpdateProjectOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/project/{projectIdOrKey}", data) as any
  },
})
