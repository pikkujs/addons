// Issue fields — This resource represents issue fields, both system and custom fields. Use it to get fields, field configurations, and create custom fields.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const CreateCustomFieldInput = z.object({
  description: z.string().optional().describe("The description of the custom field, which is displayed in Jira."),
  name: z.string().describe("The name of the custom field, which is displayed in Jira. This is not the unique identifier."),
  searcherKey: z.enum(["com.atlassian.jira.plugin.system.customfieldtypes:cascadingselectsearcher", "com.atlassian.jira.plugin.system.customfieldtypes:daterange", "com.atlassian.jira.plugin.system.customfieldtypes:datetimerange", "com.atlassian.jira.plugin.system.customfieldtypes:exactnumber", "com.atlassian.jira.plugin.system.customfieldtypes:exacttextsearcher", "com.atlassian.jira.plugin.system.customfieldtypes:grouppickersearcher", "com.atlassian.jira.plugin.system.customfieldtypes:labelsearcher", "com.atlassian.jira.plugin.system.customfieldtypes:multiselectsearcher", "com.atlassian.jira.plugin.system.customfieldtypes:numberrange", "com.atlassian.jira.plugin.system.customfieldtypes:projectsearcher", "com.atlassian.jira.plugin.system.customfieldtypes:textsearcher", "com.atlassian.jira.plugin.system.customfieldtypes:userpickergroupsearcher", "com.atlassian.jira.plugin.system.customfieldtypes:versionsearcher"]).optional().describe("The searcher defines the way the field is searched in Jira. For example, *com.atlassian.jira.plugin.system.customfieldtypes:grouppickersearcher*.  \nThe search UI (basic search and JQL search) will display different operations and values for the field, based on the field searcher. You must specify a searcher that is valid for the field type, as listed below (abbreviated values shown):\n\n *  `cascadingselect`: `cascadingselectsearcher`\n *  `datepicker`: `daterange`\n *  `datetime`: `datetimerange`\n *  `float`: `exactnumber` or `numberrange`\n *  `grouppicker`: `grouppickersearcher`\n *  `importid`: `exactnumber` or `numberrange`\n *  `labels`: `labelsearcher`\n *  `multicheckboxes`: `multiselectsearcher`\n *  `multigrouppicker`: `multiselectsearcher`\n *  `multiselect`: `multiselectsearcher`\n *  `multiuserpicker`: `userpickergroupsearcher`\n *  `multiversion`: `versionsearcher`\n *  `project`: `projectsearcher`\n *  `radiobuttons`: `multiselectsearcher`\n *  `readonlyfield`: `textsearcher`\n *  `select`: `multiselectsearcher`\n *  `textarea`: `textsearcher`\n *  `textfield`: `textsearcher`\n *  `url`: `exacttextsearcher`\n *  `userpicker`: `userpickergroupsearcher`\n *  `version`: `versionsearcher`\n\nIf no searcher is provided, the field isn't searchable. However, [Forge custom fields](https://developer.atlassian.com/platform/forge/manifest-reference/modules/#jira-custom-field-type--beta-) have a searcher set automatically, so are always searchable."),
  type: z.string().describe("The type of the custom field. These built-in custom field types are available:\n\n *  `cascadingselect`: Enables values to be selected from two levels of select lists (value: `com.atlassian.jira.plugin.system.customfieldtypes:cascadingselect`)\n *  `datepicker`: Stores a date using a picker control (value: `com.atlassian.jira.plugin.system.customfieldtypes:datepicker`)\n *  `datetime`: Stores a date with a time component (value: `com.atlassian.jira.plugin.system.customfieldtypes:datetime`)\n *  `float`: Stores and validates a numeric (floating point) input (value: `com.atlassian.jira.plugin.system.customfieldtypes:float`)\n *  `grouppicker`: Stores a user group using a picker control (value: `com.atlassian.jira.plugin.system.customfieldtypes:grouppicker`)\n *  `importid`: A read-only field that stores the ID the issue had in the system it was imported from (value: `com.atlassian.jira.plugin.system.customfieldtypes:importid`)\n *  `labels`: Stores labels (value: `com.atlassian.jira.plugin.system.customfieldtypes:labels`)\n *  `multicheckboxes`: Stores multiple values using checkboxes (value: ``)\n *  `multigrouppicker`: Stores multiple user groups using a picker control (value: ``)\n *  `multiselect`: Stores multiple values using a select list (value: `com.atlassian.jira.plugin.system.customfieldtypes:multicheckboxes`)\n *  `multiuserpicker`: Stores multiple users using a picker control (value: `com.atlassian.jira.plugin.system.customfieldtypes:multigrouppicker`)\n *  `multiversion`: Stores multiple versions from the versions available in a project using a picker control (value: `com.atlassian.jira.plugin.system.customfieldtypes:multiversion`)\n *  `project`: Stores a project from a list of projects that the user is permitted to view (value: `com.atlassian.jira.plugin.system.customfieldtypes:project`)\n *  `radiobuttons`: Stores a value using radio buttons (value: `com.atlassian.jira.plugin.system.customfieldtypes:radiobuttons`)\n *  `readonlyfield`: Stores a read-only text value, which can only be populated via the API (value: `com.atlassian.jira.plugin.system.customfieldtypes:readonlyfield`)\n *  `select`: Stores a value from a configurable list of options (value: `com.atlassian.jira.plugin.system.customfieldtypes:select`)\n *  `textarea`: Stores a long text string using a multiline text area (value: `com.atlassian.jira.plugin.system.customfieldtypes:textarea`)\n *  `textfield`: Stores a text string using a single-line text box (value: `com.atlassian.jira.plugin.system.customfieldtypes:textfield`)\n *  `url`: Stores a URL (value: `com.atlassian.jira.plugin.system.customfieldtypes:url`)\n *  `userpicker`: Stores a user using a picker control (value: `com.atlassian.jira.plugin.system.customfieldtypes:userpicker`)\n *  `version`: Stores a version using a picker control (value: `com.atlassian.jira.plugin.system.customfieldtypes:version`)\n\nTo create a field based on a [Forge custom field type](https://developer.atlassian.com/platform/forge/manifest-reference/modules/#jira-custom-field-type--beta-), use the ID of the Forge custom field type as the value. For example, `ari:cloud:ecosystem::extension/e62f20a2-4b61-4dbe-bfb9-9a88b5e3ac84/548c5df1-24aa-4f7c-bbbb-3038d947cb05/static/my-cf-type-key`."),
})

export const CreateCustomFieldOutput = z.object({
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
}).describe("Details about a field.")

export const createCustomField = pikkuSessionlessFunc({
  description: "Creates a custom field.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: CreateCustomFieldInput,
  output: CreateCustomFieldOutput,
  errors: [BadRequestError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/field", data) as any
  },
})
