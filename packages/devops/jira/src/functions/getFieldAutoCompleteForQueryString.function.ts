// JQL — This resource represents JQL search auto-complete details. Use it to obtain JQL search auto-complete data and suggestions for use in programmatic construction of queries or custom query builders. It also provides operations to: * convert one or more JQL queries with user identifiers (username or user key) to equivalent JQL queries with account IDs. * convert readable details in one or more JQL queries to IDs where a user doesn't have permission to view the entity whose details are readable.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError } from '@pikku/core/errors'

export const GetFieldAutoCompleteForQueryStringInput = z.object({
  fieldName: z.string().optional().describe("The name of the field."),
  fieldValue: z.string().optional().describe("The partial field item name entered by the user."),
  predicateName: z.string().optional().describe("The name of the [ CHANGED operator predicate](https://confluence.atlassian.com/x/hQORLQ#Advancedsearching-operatorsreference-CHANGEDCHANGED) for which the suggestions are generated. The valid predicate operators are *by*, *from*, and *to*."),
  predicateValue: z.string().optional().describe("The partial predicate item name entered by the user."),
})

export const GetFieldAutoCompleteForQueryStringOutput = z.object({
  results: z.array(z.object({
    displayName: z.string().optional().describe("The display name of a suggested item. If `fieldValue` or `predicateValue` are provided, the matching text is highlighted with the HTML bold tag."),
    value: z.string().optional().describe("The value of a suggested item."),
  })).optional().describe("The list of suggested item."),
}).describe("The results from a JQL query.")

export const getFieldAutoCompleteForQueryString = pikkuSessionlessFunc({
  description: "Returns the JQL search auto complete suggestions for a field.\n\nSuggestions can be obtained by providing:\n\n *  `fieldName` to get a list of all values for the field.\n *  `fieldName` and `fieldValue` to get a list of values containing the text in `fieldValue`.\n *  `fieldName` and `predicateName` to get a list of all predicate values for the field.\n *  `fieldName`, `predicateName`, and `predicateValue` to get a list of predicate values containing the text in `predicateValue`.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** None.",
  input: GetFieldAutoCompleteForQueryStringInput,
  output: GetFieldAutoCompleteForQueryStringOutput,
  errors: [BadRequestError, UnauthorizedError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/jql/autocompletedata/suggestions", data) as any
  },
})
