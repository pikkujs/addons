// Workflow schemes — This resource represents workflow schemes. Use it to manage workflow schemes and the workflow scheme's workflows and issue types. A workflow scheme maps issue types to workflows. A workflow scheme can be associated with one or more projects, which enables the projects to use the workflow-issue type mappings. Active workflow schemes (workflow schemes that are used by projects) cannot be edited. When an active workflow scheme is edited, a draft copy of the scheme is created. The draft workflow scheme is then be edited and published (replacing the active scheme). See [Configuring workflow schemes](https://confluence.atlassian.com/x/tohKLg) for more information.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const GetAllWorkflowSchemesInput = z.object({
  startAt: z.number().int().optional().default(0).describe("The index of the first item to return in a page of results (page offset)."),
  maxResults: z.number().int().optional().default(50).describe("The maximum number of items to return per page."),
})

export const GetAllWorkflowSchemesOutput = z.object({
  isLast: z.boolean().optional().describe("Whether this is the last page."),
  maxResults: z.number().int().optional().describe("The maximum number of items that could be returned."),
  nextPage: z.string().url().optional().describe("If there is another page of results, the URL of the next page."),
  self: z.string().url().optional().describe("The URL of the page."),
  startAt: z.number().int().optional().describe("The index of the first item returned."),
  total: z.number().int().optional().describe("The number of items returned."),
  values: z.array(z.object({
    defaultWorkflow: z.string().optional().describe("The name of the default workflow for the workflow scheme. The default workflow has *All Unassigned Issue Types* assigned to it in Jira. If `defaultWorkflow` is not specified when creating a workflow scheme, it is set to *Jira Workflow (jira)*."),
    description: z.string().optional().describe("The description of the workflow scheme."),
    draft: z.boolean().optional().describe("Whether the workflow scheme is a draft or not."),
    id: z.number().int().optional().describe("The ID of the workflow scheme."),
    issueTypeMappings: z.record(z.string(), z.string()).optional().describe("The issue type to workflow mappings, where each mapping is an issue type ID and workflow name pair. Note that an issue type can only be mapped to one workflow in a workflow scheme."),
    issueTypes: z.record(z.string(), z.object({
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
    }).describe("Details about an issue type.")).optional().describe("The issue types available in Jira."),
    lastModified: z.string().optional().describe("The date-time that the draft workflow scheme was last modified. A modification is a change to the issue type-project mappings only. This property does not apply to non-draft workflows."),
    lastModifiedUser: z.object({
      accountId: z.string().max(128).optional().describe("The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. Required in requests."),
      accountType: z.enum(["atlassian", "app", "customer", "unknown"]).optional().describe("The user account type. Can take the following values:\n\n *  `atlassian` regular Atlassian user account\n *  `app` system account used for Connect applications and OAuth to represent external systems\n *  `customer` Jira Service Desk account representing an external service desk"),
      active: z.boolean().optional().describe("Whether the user is active."),
      applicationRoles: z.object({
        callback: z.record(z.string(), z.unknown()).optional(),
        items: z.array(z.object({
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
        })).optional(),
        "max-results": z.number().int().optional(),
        pagingCallback: z.record(z.string(), z.unknown()).optional(),
        size: z.number().int().optional(),
      }).optional().describe("The application roles the user is assigned to."),
      avatarUrls: z.object({
        "16x16": z.string().url().optional().describe("The URL of the item's 16x16 pixel avatar."),
        "24x24": z.string().url().optional().describe("The URL of the item's 24x24 pixel avatar."),
        "32x32": z.string().url().optional().describe("The URL of the item's 32x32 pixel avatar."),
        "48x48": z.string().url().optional().describe("The URL of the item's 48x48 pixel avatar."),
      }).optional().describe("The avatars of the user."),
      displayName: z.string().optional().describe("The display name of the user. Depending on the user’s privacy setting, this may return an alternative value."),
      emailAddress: z.string().optional().describe("The email address of the user. Depending on the user’s privacy setting, this may be returned as null."),
      expand: z.string().optional().describe("Expand options that include additional user details in the response."),
      groups: z.object({
        callback: z.record(z.string(), z.unknown()).optional(),
        items: z.array(z.object({
          groupId: z.string().nullable().optional().describe("The ID of the group, which uniquely identifies the group across all Atlassian products. For example, *952d12c3-5b5b-4d04-bb32-44d383afc4b2*."),
          name: z.string().optional().describe("The name of group."),
          self: z.string().url().optional().describe("The URL for these group details."),
        })).optional(),
        "max-results": z.number().int().optional(),
        pagingCallback: z.record(z.string(), z.unknown()).optional(),
        size: z.number().int().optional(),
      }).optional().describe("The groups that the user belongs to."),
      key: z.string().optional().describe("This property is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details."),
      locale: z.string().optional().describe("The locale of the user. Depending on the user’s privacy setting, this may be returned as null."),
      name: z.string().optional().describe("This property is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details."),
      self: z.string().url().optional().describe("The URL of the user."),
      timeZone: z.string().optional().describe("The time zone specified in the user's profile. Depending on the user’s privacy setting, this may be returned as null."),
    }).optional().describe("The user that last modified the draft workflow scheme. A modification is a change to the issue type-project mappings only. This property does not apply to non-draft workflows."),
    name: z.string().optional().describe("The name of the workflow scheme. The name must be unique. The maximum length is 255 characters. Required when creating a workflow scheme."),
    originalDefaultWorkflow: z.string().optional().describe("For draft workflow schemes, this property is the name of the default workflow for the original workflow scheme. The default workflow has *All Unassigned Issue Types* assigned to it in Jira."),
    originalIssueTypeMappings: z.record(z.string(), z.string()).optional().describe("For draft workflow schemes, this property is the issue type to workflow mappings for the original workflow scheme, where each mapping is an issue type ID and workflow name pair. Note that an issue type can only be mapped to one workflow in a workflow scheme."),
    self: z.string().url().optional(),
    updateDraftIfNeeded: z.boolean().optional().describe("Whether to create or update a draft workflow scheme when updating an active workflow scheme. An active workflow scheme is a workflow scheme that is used by at least one project. The following examples show how this property works:\n\n *  Update an active workflow scheme with `updateDraftIfNeeded` set to `true`: If a draft workflow scheme exists, it is updated. Otherwise, a draft workflow scheme is created.\n *  Update an active workflow scheme with `updateDraftIfNeeded` set to `false`: An error is returned, as active workflow schemes cannot be updated.\n *  Update an inactive workflow scheme with `updateDraftIfNeeded` set to `true`: The workflow scheme is updated, as inactive workflow schemes do not require drafts to update.\n\nDefaults to `false`."),
  })).optional().describe("The list of items."),
}).describe("A page of items.")

export const getAllWorkflowSchemes = pikkuSessionlessFunc({
  description: "Returns a [paginated](#pagination) list of all workflow schemes, not including draft workflow schemes.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: GetAllWorkflowSchemesInput,
  output: GetAllWorkflowSchemesOutput,
  errors: [UnauthorizedError, ForbiddenError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/workflowscheme", data) as any
  },
})
