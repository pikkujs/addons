// Issues — This resource represents Jira issues. Use it to: * create or edit issues, individually or in bulk. * retrieve metadata about the options for creating or editing issues. * delete an issue. * assign a user to an issue. * get issue changelogs. * send notifications about an issue. * get details of the transitions available for an issue. * transition an issue.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError } from '@pikku/core/errors'

export const GetCreateIssueMetaInput = z.object({
  projectIds: z.array(z.string()).optional().describe("List of project IDs. This parameter accepts a comma-separated list. Multiple project IDs can also be provided using an ampersand-separated list. For example, `projectIds=10000,10001&projectIds=10020,10021`. This parameter may be provided with `projectKeys`."),
  projectKeys: z.array(z.string()).optional().describe("List of project keys. This parameter accepts a comma-separated list. Multiple project keys can also be provided using an ampersand-separated list. For example, `projectKeys=proj1,proj2&projectKeys=proj3`. This parameter may be provided with `projectIds`."),
  issuetypeIds: z.array(z.string()).optional().describe("List of issue type IDs. This parameter accepts a comma-separated list. Multiple issue type IDs can also be provided using an ampersand-separated list. For example, `issuetypeIds=10000,10001&issuetypeIds=10020,10021`. This parameter may be provided with `issuetypeNames`."),
  issuetypeNames: z.array(z.string()).optional().describe("List of issue type names. This parameter accepts a comma-separated list. Multiple issue type names can also be provided using an ampersand-separated list. For example, `issuetypeNames=name1,name2&issuetypeNames=name3`. This parameter may be provided with `issuetypeIds`."),
  expand: z.string().optional().describe("Use [expand](#expansion) to include additional information about issue metadata in the response. This parameter accepts `projects.issuetypes.fields`, which returns information about the fields in the issue creation screen for each issue type. Fields hidden from the screen are not returned. Use the information to populate the `fields` and `update` fields in [Create issue](#api-rest-api-3-issue-post) and [Create issues](#api-rest-api-3-issue-bulk-post)."),
})

export const GetCreateIssueMetaOutput = z.object({
  expand: z.string().optional().describe("Expand options that include additional project details in the response."),
  projects: z.array(z.object({
    avatarUrls: z.object({
      "16x16": z.string().url().optional().describe("The URL of the item's 16x16 pixel avatar."),
      "24x24": z.string().url().optional().describe("The URL of the item's 24x24 pixel avatar."),
      "32x32": z.string().url().optional().describe("The URL of the item's 32x32 pixel avatar."),
      "48x48": z.string().url().optional().describe("The URL of the item's 48x48 pixel avatar."),
    }).optional().describe("List of the project's avatars, returning the avatar size and associated URL."),
    expand: z.string().optional().describe("Expand options that include additional project issue create metadata details in the response."),
    id: z.string().optional().describe("The ID of the project."),
    issuetypes: z.array(z.object({
      avatarId: z.number().int().optional().describe("The ID of the issue type's avatar."),
      description: z.string().optional().describe("The description of the issue type."),
      entityId: z.string().uuid().optional().describe("Unique ID for next-gen projects."),
      expand: z.string().optional().describe("Expand options that include additional issue type metadata details in the response."),
      fields: z.record(z.string(), z.object({
        allowedValues: z.array(z.unknown()).optional().describe("The list of values allowed in the field."),
        autoCompleteUrl: z.string().optional().describe("The URL that can be used to automatically complete the field."),
        configuration: z.record(z.string(), z.unknown()).optional().describe("The configuration properties."),
        defaultValue: z.unknown().optional().describe("The default value of the field."),
        hasDefaultValue: z.boolean().optional().describe("Whether the field has a default value."),
        key: z.string().describe("The key of the field."),
        name: z.string().describe("The name of the field."),
        operations: z.array(z.string()).describe("The list of operations that can be performed on the field."),
        required: z.boolean().describe("Whether the field is required."),
        schema: z.object({
          configuration: z.record(z.string(), z.unknown()).optional().describe("If the field is a custom field, the configuration of the field."),
          custom: z.string().optional().describe("If the field is a custom field, the URI of the field."),
          customId: z.number().int().optional().describe("If the field is a custom field, the custom ID of the field."),
          items: z.string().optional().describe("When the data type is an array, the name of the field items within the array."),
          system: z.string().optional().describe("If the field is a system field, the name of the field."),
          type: z.string().describe("The data type of the field."),
        }).describe("The data type of the field."),
      }).describe("The metadata describing an issue field.")).optional().describe("List of the fields available when creating an issue for the issue type."),
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
    })).optional().describe("List of the issue types supported by the project."),
    key: z.string().optional().describe("The key of the project."),
    name: z.string().optional().describe("The name of the project."),
    self: z.string().optional().describe("The URL of the project."),
  })).optional().describe("List of projects and their issue creation metadata."),
}).describe("The wrapper for the issue creation metadata for a list of projects.")

export const getCreateIssueMeta = pikkuSessionlessFunc({
  description: "Returns details of projects, issue types within projects, and, when requested, the create screen fields for each issue type for the user. Use the information to populate the requests in [ Create issue](#api-rest-api-3-issue-post) and [Create issues](#api-rest-api-3-issue-bulk-post).\n\nThe request can be restricted to specific projects or issue types using the query parameters. The response will contain information for the valid projects, issue types, or project and issue type combinations requested. Note that invalid project, issue type, or project and issue type combinations do not generate errors.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** *Create issues* [project permission](https://confluence.atlassian.com/x/yodKLg) in the requested projects.",
  input: GetCreateIssueMetaInput,
  output: GetCreateIssueMetaOutput,
  errors: [UnauthorizedError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/issue/createmeta", data) as any
  },
})
