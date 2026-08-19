// Issue fields — This resource represents issue fields, both system and custom fields. Use it to get fields, field configurations, and create custom fields.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError } from '@pikku/core/errors'

export const GetFieldsOutput = z.array(z.object({
  clauseNames: z.array(z.string()).optional().describe("The names that can be used to reference the field in an advanced search. For more information, see [Advanced searching - fields reference](https://confluence.atlassian.com/x/gwORLQ)."),
  custom: z.boolean().optional().describe("Whether the field is a custom field."),
  id: z.string().optional().describe("The ID of the field."),
  key: z.string().optional().describe("The key of the field."),
  name: z.string().optional().describe("The name of the field."),
  navigable: z.boolean().optional().describe("Whether the field can be used as a column on the issue navigator."),
  orderable: z.boolean().optional().describe("Whether the content of the field can be used to order lists."),
  schema: z.object({
    configuration: z.record(z.string(), z.unknown()).optional().describe("If the field is a custom field, the configuration of the field."),
    custom: z.string().optional().describe("If the field is a custom field, the URI of the field."),
    customId: z.number().int().optional().describe("If the field is a custom field, the custom ID of the field."),
    items: z.string().optional().describe("When the data type is an array, the name of the field items within the array."),
    system: z.string().optional().describe("If the field is a system field, the name of the field."),
    type: z.string().describe("The data type of the field."),
  }).optional().describe("The data schema for the field."),
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
  }).optional().describe("The scope of the field."),
  searchable: z.boolean().optional().describe("Whether the content of the field can be searched."),
}))

export const getFields = pikkuSessionlessFunc({
  description: "Returns system and custom issue fields according to the following rules:\n\n *  Fields that cannot be added to the issue navigator are always returned.\n *  Fields that cannot be placed on an issue screen are always returned.\n *  Fields that depend on global Jira settings are only returned if the setting is enabled. That is, timetracking fields, subtasks, votes, and watches.\n *  For all other fields, this operation only returns the fields that the user has permission to view (that is, the field is used in at least one project that the user has *Browse Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for.)\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** None.",
  output: GetFieldsOutput,
  errors: [UnauthorizedError],
  func: async ({ jira }) => {
    return jira.call("GET", "/rest/api/3/field") as any
  },
})
