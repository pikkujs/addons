// Issue properties — This resource represents [issue](#api-group-Issues) properties, which provides for storing custom data against an issue. Use it to get, set, and delete issue properties as well as obtain details of all properties on an issue. Operations to bulk update and delete issue properties are also provided. Issue properties are a type of [entity property](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/).

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError } from '@pikku/core/errors'

export const BulkSetIssuesPropertiesListInput = z.object({
  entitiesIds: z.array(z.number().int()).min(1).max(10000).optional().describe("A list of entity property IDs."),
  properties: z.record(z.string(), z.object({
  array: z.boolean().optional(),
  bigDecimal: z.boolean().optional(),
  bigInteger: z.boolean().optional(),
  bigIntegerValue: z.number().int().optional(),
  binary: z.boolean().optional(),
  binaryValue: z.array(z.string()).optional(),
  boolean: z.boolean().optional(),
  booleanValue: z.boolean().optional(),
  containerNode: z.boolean().optional(),
  decimalValue: z.number().optional(),
  double: z.boolean().optional(),
  doubleValue: z.number().optional(),
  elements: z.record(z.string(), z.unknown()).optional(),
  fieldNames: z.record(z.string(), z.unknown()).optional(),
  fields: z.record(z.string(), z.unknown()).optional(),
  floatingPointNumber: z.boolean().optional(),
  int: z.boolean().optional(),
  intValue: z.number().int().optional(),
  integralNumber: z.boolean().optional(),
  long: z.boolean().optional(),
  longValue: z.number().int().optional(),
  missingNode: z.boolean().optional(),
  null: z.boolean().optional(),
  number: z.boolean().optional(),
  numberType: z.enum(["INT", "LONG", "BIG_INTEGER", "FLOAT", "DOUBLE", "BIG_DECIMAL"]).optional(),
  numberValue: z.number().optional(),
  object: z.boolean().optional(),
  pojo: z.boolean().optional(),
  textValue: z.string().optional(),
  textual: z.boolean().optional(),
  valueAsBoolean: z.boolean().optional(),
  valueAsDouble: z.number().optional(),
  valueAsInt: z.number().int().optional(),
  valueAsLong: z.number().int().optional(),
  valueAsText: z.string().optional(),
  valueNode: z.boolean().optional(),
})).optional().describe("A list of entity property keys and values."),
})

export const bulkSetIssuesPropertiesList = pikkuSessionlessFunc({
  description: "Sets or updates a list of entity property values on issues. A list of up to 10 entity properties can be specified along with up to 10,000 issues on which to set or update that list of entity properties.\n\nThe value of the request body must be a [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON. The maximum length of single issue property value is 32768 characters. This operation can be accessed anonymously.\n\nThis operation is:\n\n *  transactional, either all properties are updated in all eligible issues or, when errors occur, no properties are updated.\n *  [asynchronous](#async). Follow the `location` link in the response to determine the status of the task and use [Get task](#api-rest-api-3-task-taskId-get) to obtain subsequent updates.\n\n**[Permissions](#permissions) required:**\n\n *  *Browse projects* and *Edit issues* [project permissions](https://confluence.atlassian.com/x/yodKLg) for the project containing the issue.\n *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.",
  input: BulkSetIssuesPropertiesListInput,
  errors: [BadRequestError, UnauthorizedError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/issue/properties", data)
  },
})
