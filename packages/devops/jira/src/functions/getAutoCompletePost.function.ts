// JQL — This resource represents JQL search auto-complete details. Use it to obtain JQL search auto-complete data and suggestions for use in programmatic construction of queries or custom query builders. It also provides operations to: * convert one or more JQL queries with user identifiers (username or user key) to equivalent JQL queries with account IDs. * convert readable details in one or more JQL queries to IDs where a user doesn't have permission to view the entity whose details are readable.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError } from '@pikku/core/errors'

export const GetAutoCompletePostInput = z.object({
  includeCollapsedFields: z.boolean().optional().default(false).describe("Include collapsed fields for fields that have non-unique names."),
  projectIds: z.array(z.number().int()).optional().describe("List of project IDs used to filter the visible field details returned."),
})

export const GetAutoCompletePostOutput = z.object({
  jqlReservedWords: z.array(z.string()).optional().describe("List of JQL query reserved words."),
  visibleFieldNames: z.array(z.object({
    auto: z.enum(["true", "false"]).optional().describe("Whether the field provide auto-complete suggestions."),
    cfid: z.string().optional().describe("If the item is a custom field, the ID of the custom field."),
    deprecated: z.enum(["true", "false"]).optional().describe("Whether this field has been deprecated."),
    deprecatedSearcherKey: z.string().optional().describe("The searcher key of the field, only passed when the field is deprecated."),
    displayName: z.string().optional().describe("The display name contains the following:\n\n *  for system fields, the field name. For example, `Summary`.\n *  for collapsed custom fields, the field name followed by a hyphen and then the field name and field type. For example, `Component - Component[Dropdown]`.\n *  for other custom fields, the field name followed by a hyphen and then the custom field ID. For example, `Component - cf[10061]`."),
    operators: z.array(z.string()).optional().describe("The valid search operators for the field."),
    orderable: z.enum(["true", "false"]).optional().describe("Whether the field can be used in a query's `ORDER BY` clause."),
    searchable: z.enum(["true", "false"]).optional().describe("Whether the content of this field can be searched."),
    types: z.array(z.string()).optional().describe("The data types of items in the field."),
    value: z.string().optional().describe("The field identifier."),
  })).optional().describe("List of fields usable in JQL queries."),
  visibleFunctionNames: z.array(z.object({
    displayName: z.string().optional().describe("The display name of the function."),
    isList: z.enum(["true", "false"]).optional().describe("Whether the function can take a list of arguments."),
    types: z.array(z.string()).optional().describe("The data types returned by the function."),
    value: z.string().optional().describe("The function identifier."),
  })).optional().describe("List of functions usable in JQL queries."),
}).describe("Lists of JQL reference data.")

export const getAutoCompletePost = pikkuSessionlessFunc({
  description: "Returns reference data for JQL searches. This is a downloadable version of the documentation provided in [Advanced searching - fields reference](https://confluence.atlassian.com/x/gwORLQ) and [Advanced searching - functions reference](https://confluence.atlassian.com/x/hgORLQ), along with a list of JQL-reserved words. Use this information to assist with the programmatic creation of JQL queries or the validation of queries built in a custom query builder.\n\nThis operation can filter the custom fields returned by project. Invalid project IDs in `projectIds` are ignored. System fields are always returned.\n\nIt can also return the collapsed field for custom fields. Collapsed fields enable searches to be performed across all fields with the same name and of the same field type. For example, the collapsed field `Component - Component[Dropdown]` enables dropdown fields `Component - cf[10061]` and `Component - cf[10062]` to be searched simultaneously.\n\n**[Permissions](#permissions) required:** None.",
  input: GetAutoCompletePostInput,
  output: GetAutoCompletePostOutput,
  errors: [BadRequestError, UnauthorizedError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/jql/autocompletedata", data) as any
  },
})
