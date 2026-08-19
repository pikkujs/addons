// JQL — This resource represents JQL search auto-complete details. Use it to obtain JQL search auto-complete data and suggestions for use in programmatic construction of queries or custom query builders. It also provides operations to: * convert one or more JQL queries with user identifiers (username or user key) to equivalent JQL queries with account IDs. * convert readable details in one or more JQL queries to IDs where a user doesn't have permission to view the entity whose details are readable.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError } from '@pikku/core/errors'

export const GetAutoCompleteOutput = z.object({
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

export const getAutoComplete = pikkuSessionlessFunc({
  description: "Returns reference data for JQL searches. This is a downloadable version of the documentation provided in [Advanced searching - fields reference](https://confluence.atlassian.com/x/gwORLQ) and [Advanced searching - functions reference](https://confluence.atlassian.com/x/hgORLQ), along with a list of JQL-reserved words. Use this information to assist with the programmatic creation of JQL queries or the validation of queries built in a custom query builder.\n\nTo filter visible field details by project or collapse non-unique fields by field type then [Get field reference data (POST)](#api-rest-api-3-jql-autocompletedata-post) can be used.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** None.",
  output: GetAutoCompleteOutput,
  errors: [UnauthorizedError],
  func: async ({ jira }) => {
    return jira.call("GET", "/rest/api/3/jql/autocompletedata") as any
  },
})
