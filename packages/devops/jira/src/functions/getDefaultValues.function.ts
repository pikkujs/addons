// Issue custom field contexts — This resource represents issue custom field contexts. Use it to: * get, create, update, and delete custom field contexts. * get context to issue types and projects mappings. * get custom field contexts for projects and issue types. * assign custom field contexts to projects. * remove custom field contexts from projects. * add issue types to custom field contexts.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const GetDefaultValuesInput = z.object({
  fieldId: z.string().describe("The ID of the custom field, for example `customfield\\_10000`."),
  contextId: z.array(z.number().int()).optional().describe("The IDs of the contexts."),
  startAt: z.number().int().optional().default(0).describe("The index of the first item to return in a page of results (page offset)."),
  maxResults: z.number().int().optional().default(50).describe("The maximum number of items to return per page."),
})

export const GetDefaultValuesOutput = z.object({
  isLast: z.boolean().optional().describe("Whether this is the last page."),
  maxResults: z.number().int().optional().describe("The maximum number of items that could be returned."),
  nextPage: z.string().url().optional().describe("If there is another page of results, the URL of the next page."),
  self: z.string().url().optional().describe("The URL of the page."),
  startAt: z.number().int().optional().describe("The index of the first item returned."),
  total: z.number().int().optional().describe("The number of items returned."),
  values: z.array(z.union([z.object({
    cascadingOptionId: z.string().optional().describe("The ID of the default cascading option."),
    contextId: z.string().describe("The ID of the context."),
    optionId: z.string().describe("The ID of the default option."),
    type: z.string(),
  }), z.object({
    contextId: z.string().describe("The ID of the context."),
    optionIds: z.array(z.string()).describe("The list of IDs of the default options."),
    type: z.string(),
  }), z.object({
    contextId: z.string().describe("The ID of the context."),
    optionId: z.string().describe("The ID of the default option."),
    type: z.string(),
  }), z.object({
    accountId: z.string().describe("The ID of the default user."),
    contextId: z.string().describe("The ID of the context."),
    type: z.string(),
    userFilter: z.object({
      enabled: z.boolean().describe("Whether the filter is enabled."),
      groups: z.array(z.string()).optional().describe("User groups autocomplete suggestion users must belong to. If not provided, the default values are used. A maximum of 10 groups can be provided."),
      roleIds: z.array(z.number().int()).optional().describe("Roles that autocomplete suggestion users must belong to. If not provided, the default values are used. A maximum of 10 roles can be provided."),
    }).describe("Filter for a User Picker (single) custom field."),
  }), z.object({
    accountIds: z.array(z.string()).describe("The IDs of the default users."),
    contextId: z.string().describe("The ID of the context."),
    type: z.string(),
  }), z.object({
    contextId: z.string().describe("The ID of the context."),
    groupId: z.string().describe("The ID of the the default group."),
    type: z.string(),
  }), z.object({
    contextId: z.string().describe("The ID of the context."),
    groupIds: z.array(z.string()).describe("The IDs of the default groups."),
    type: z.string(),
  }), z.object({
    date: z.string().optional().describe("The default date in ISO format. Ignored if `useCurrent` is true."),
    type: z.string(),
    useCurrent: z.boolean().optional().default(false).describe("Whether to use the current date."),
  }), z.object({
    dateTime: z.string().optional().describe("The default date-time in ISO format. Ignored if `useCurrent` is true."),
    type: z.string(),
    useCurrent: z.boolean().optional().default(false).describe("Whether to use the current date."),
  }), z.object({
    contextId: z.string().describe("The ID of the context."),
    type: z.string(),
    url: z.string().describe("The default URL."),
  }), z.object({
    contextId: z.string().describe("The ID of the context."),
    projectId: z.string().describe("The ID of the default project."),
    type: z.string(),
  }), z.object({
    number: z.number().describe("The default floating-point number."),
    type: z.string(),
  }), z.object({
    labels: z.array(z.string()).describe("The default labels value."),
    type: z.string(),
  }), z.object({
    text: z.string().optional().describe("The default text. The maximum length is 254 characters."),
    type: z.string(),
  }), z.object({
    text: z.string().optional().describe("The default text. The maximum length is 32767 characters."),
    type: z.string(),
  }), z.object({
    text: z.string().optional().describe("The default text. The maximum length is 255 characters."),
    type: z.string(),
  }), z.object({
    type: z.string(),
    versionId: z.string().describe("The ID of the default version."),
    versionOrder: z.string().optional().describe("The order the pickable versions are displayed in. If not provided, the released-first order is used. Available version orders are `\"releasedFirst\"` and `\"unreleasedFirst\"`."),
  }), z.object({
    type: z.string(),
    versionIds: z.array(z.string()).describe("The IDs of the default versions."),
    versionOrder: z.string().optional().describe("The order the pickable versions are displayed in. If not provided, the released-first order is used. Available version orders are `\"releasedFirst\"` and `\"unreleasedFirst\"`."),
  }), z.object({
    contextId: z.string().describe("The ID of the context."),
    text: z.string().optional().describe("The default text. The maximum length is 254 characters."),
    type: z.string(),
  }), z.object({
    type: z.string(),
    values: z.array(z.string()).optional().describe("List of string values. The maximum length for a value is 254 characters."),
  }), z.object({
    object: z.record(z.string(), z.unknown()).optional().describe("The default JSON object."),
    type: z.string(),
  }), z.object({
    contextId: z.string().describe("The ID of the context."),
    dateTime: z.string().optional().describe("The default date-time in ISO format. Ignored if `useCurrent` is true."),
    type: z.string(),
    useCurrent: z.boolean().optional().default(false).describe("Whether to use the current date."),
  }), z.object({
    contextId: z.string().describe("The ID of the context."),
    groupId: z.string().describe("The ID of the the default group."),
    type: z.string(),
  }), z.object({
    contextId: z.string().describe("The ID of the context."),
    groupIds: z.array(z.string()).describe("The IDs of the default groups."),
    type: z.string(),
  }), z.object({
    contextId: z.string().describe("The ID of the context."),
    number: z.number().describe("The default floating-point number."),
    type: z.string(),
  }), z.object({
    accountId: z.string().describe("The ID of the default user."),
    contextId: z.string().describe("The ID of the context."),
    type: z.string(),
    userFilter: z.object({
      enabled: z.boolean().describe("Whether the filter is enabled."),
      groups: z.array(z.string()).optional().describe("User groups autocomplete suggestion users must belong to. If not provided, the default values are used. A maximum of 10 groups can be provided."),
      roleIds: z.array(z.number().int()).optional().describe("Roles that autocomplete suggestion users must belong to. If not provided, the default values are used. A maximum of 10 roles can be provided."),
    }).describe("Filter for a User Picker (single) custom field."),
  }), z.object({
    accountIds: z.array(z.string()).describe("The IDs of the default users."),
    contextId: z.string().describe("The ID of the context."),
    type: z.string(),
  })])).optional().describe("The list of items."),
}).describe("A page of items.")

export const getDefaultValues = pikkuSessionlessFunc({
  description: "Returns a [paginated](#pagination) list of defaults for a custom field. The results can be filtered by `contextId`, otherwise all values are returned. If no defaults are set for a context, nothing is returned.  \nThe returned object depends on type of the custom field:\n\n *  `CustomFieldContextDefaultValueDate` (type `datepicker`) for date fields.\n *  `CustomFieldContextDefaultValueDateTime` (type `datetimepicker`) for date-time fields.\n *  `CustomFieldContextDefaultValueSingleOption` (type `option.single`) for single choice select lists and radio buttons.\n *  `CustomFieldContextDefaultValueMultipleOption` (type `option.multiple`) for multiple choice select lists and checkboxes.\n *  `CustomFieldContextDefaultValueCascadingOption` (type `option.cascading`) for cascading select lists.\n *  `CustomFieldContextSingleUserPickerDefaults` (type `single.user.select`) for single users.\n *  `CustomFieldContextDefaultValueMultiUserPicker` (type `multi.user.select`) for user lists.\n *  `CustomFieldContextDefaultValueSingleGroupPicker` (type `grouppicker.single`) for single choice group pickers.\n *  `CustomFieldContextDefaultValueMultipleGroupPicker` (type `grouppicker.multiple`) for multiple choice group pickers.\n *  `CustomFieldContextDefaultValueURL` (type `url`) for URLs.\n *  `CustomFieldContextDefaultValueProject` (type `project`) for project pickers.\n *  `CustomFieldContextDefaultValueFloat` (type `float`) for floats (floating-point numbers).\n *  `CustomFieldContextDefaultValueLabels` (type `labels`) for labels.\n *  `CustomFieldContextDefaultValueTextField` (type `textfield`) for text fields.\n *  `CustomFieldContextDefaultValueTextArea` (type `textarea`) for text area fields.\n *  `CustomFieldContextDefaultValueReadOnly` (type `readonly`) for read only (text) fields.\n *  `CustomFieldContextDefaultValueMultipleVersion` (type `version.multiple`) for single choice version pickers.\n *  `CustomFieldContextDefaultValueSingleVersion` (type `version.single`) for multiple choice version pickers.\n\nForge custom fields [types](https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field-type/#data-types) are also supported, returning:\n\n *  `CustomFieldContextDefaultValueForgeStringFieldBean` (type `forge.string`) for Forge string fields.\n *  `CustomFieldContextDefaultValueForgeMultiStringFieldBean` (type `forge.string.list`) for Forge string collection fields.\n *  `CustomFieldContextDefaultValueForgeObjectFieldBean` (type `forge.object`) for Forge object fields.\n *  `CustomFieldContextDefaultValueForgeDateTimeFieldBean` (type `forge.datetime`) for Forge date-time fields.\n *  `CustomFieldContextDefaultValueForgeGroupFieldBean` (type `forge.group`) for Forge group fields.\n *  `CustomFieldContextDefaultValueForgeMultiGroupFieldBean` (type `forge.group.list`) for Forge group collection fields.\n *  `CustomFieldContextDefaultValueForgeNumberFieldBean` (type `forge.number`) for Forge number fields.\n *  `CustomFieldContextDefaultValueForgeUserFieldBean` (type `forge.user`) for Forge user fields.\n *  `CustomFieldContextDefaultValueForgeMultiUserFieldBean` (type `forge.user.list`) for Forge user collection fields.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: GetDefaultValuesInput,
  output: GetDefaultValuesOutput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/field/{fieldId}/context/defaultValue", data) as any
  },
})
